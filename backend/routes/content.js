// routes/content.js

import express from 'express';
import tmdb from '../utils/tmdbClient.js';

const router = express.Router();

router.get('/:media_type/:id', async (req, res) => {
  const { media_type, id } = req.params;

  try {
    // ⭐ OPTIMIZATION: No need to pass api_key, the client handles it.
    // All three requests are fired concurrently for maximum speed.
    const [detailsRes, videosRes, providersRes] = await Promise.all([
      tmdb.get(`/${media_type}/${id}`, { params: { language: 'en-US' } }),
      tmdb.get(`/${media_type}/${id}/videos`, { params: { language: 'en-US' } }),
      tmdb.get(`/${media_type}/${id}/watch/providers`),
    ]);

    const details = detailsRes.data;
    const videos = videosRes.data.results;
    const providers = providersRes.data.results;

    const trailer = videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer');
    const region = providers['IN'] || providers['US'] || {};
    const flatrate = region.flatrate ? region.flatrate.slice(0, 3) : [];

    res.json({
      title: media_type === 'movie' ? details.title : details.name,
      overview: details.overview,
      trailerKey: trailer ? trailer.key : null,
      providers: flatrate,
    });
  } catch (err) {
    console.error('Content detail error:', err.response?.data?.status_message || err.message);
    res.status(500).json({ error: 'Failed to fetch content details.' });
  }
});

export default router;