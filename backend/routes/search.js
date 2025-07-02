import express from 'express';
import tmdb from '../utils/tmdbClient.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.json({ results: [] });

  try {
    const response = await tmdb.get('/search/multi', {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query,
        include_adult: false,
        language: 'en-US',
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error('Search error:', err.message);
    res.status(500).json({ error: 'Search failed' });
  }
});

export default router;
