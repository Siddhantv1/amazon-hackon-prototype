import express from 'express';
import tmdb from '../utils/tmdbClient.js';
import delay from '../utils/delay.js';

const router = express.Router();

//discovery results for a given type ('movie' or 'tv')
async function getDiscoverPage(type, page) {
  const response = await tmdb.get(`/discover/${type}`, {
    params: {
      language: 'en-US',
      sort_by: 'popularity.desc',
      include_adult: false,
      vote_count_gte: 500,
      with_original_language: 'hi|ta|te|ml|en|ja',
      page,
    },
  });
  return response.data.results;
}

// Helper function to get full details (including logo)
async function getItemDetails(item) {
  const type = item.title ? 'movie' : 'tv';
  const imagesRes = await tmdb.get(`/${type}/${item.id}/images`, {
    params: {
      include_image_language: 'en,null', // Prioritize English logos
    },
  });

  const logos = imagesRes.data.logos;
  const logo = logos.find((l) => l.iso_639_1 === 'en') || logos[0] || null;

  return {
    id: item.id,
    title: item.title || item.name,
    backdrop_path: item.backdrop_path,
    logo_path: logo ? `https://image.tmdb.org/t/p/original${logo.file_path}` : null,
    media_type: type,
  };
}


router.get('/', async (req, res) => {
  try {
    //random initial items
    const collectedItems = [];
    //fresh content on each visit
    let page = Math.floor(Math.random() * 15) + 1;
    const maxPage = 40;

    while (collectedItems.length < 18 && page <= maxPage) {
      // Fetch movies and TV shows
      const [movieResults, tvResults] = await Promise.all([
        getDiscoverPage('movie', page),
        getDiscoverPage('tv', page),
      ]);

      const validItems = [...movieResults, ...tvResults].filter(
        (i) => i.backdrop_path && i.vote_average > 7.0
      );

      collectedItems.push(...validItems);
      page++;
      
      // Delay only if we need to fetch another page
      if (collectedItems.length < 18 && page <= maxPage) {
          await delay(250);
      }
    }

    const itemsToProcess = collectedItems.slice(0, 18);

    //Fetch logos for all items concurrently, not one-by-one
    const recommendationPromises = itemsToProcess.map(item => getItemDetails(item));
    const finalRecommendations = await Promise.all(recommendationPromises);

    res.json(finalRecommendations);

  } catch (err) {
    console.error('Recommendations error:', err.response?.data?.status_message || err.message);
    //Send a proper error status, consistent with other routes
    res.status(500).json({ error: 'Failed to fetch recommendations.' });
  }
});

export default router;