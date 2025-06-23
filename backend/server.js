
import express from 'express';
import cors from 'cors';
import recommendationsRouter from './routes/recommendations.js';
import contentRouter from './routes/content.js';

const app = express();

app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use('/api/recommendations', recommendationsRouter);
app.use('/api/content', contentRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));