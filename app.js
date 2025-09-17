import express from 'express';
import { PORT } from './config/env.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the subscription tracker');
});

app.listen(PORT, () => {
  console.log(`Subscription tracker running on http://localhost:${PORT}`);
});

export default app;