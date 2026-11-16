/**
 * Runs the API on port 3000 with in-memory storage and clearly labelled sample
 * reviews, so the frontend can be developed without MySQL (npm run dev:mock).
 * Data is lost on restart. Never use this in production.
 */
import { buildTestApp } from './helpers.js';

const MOCK_PORT = 3000;
const { app, reviews } = buildTestApp();

for (const [name, rating, comment] of [
  ['Sample Customer A', 5, '[Sample review] Clean crown molding lines and a tidy job site every day.'],
  ['Sample Customer B', 5, '[Sample review] The new interior doors and casing fit perfectly.'],
  ['Sample Customer C', 4, '[Sample review] Great communication from start to finish on our trim package.'],
] as const) {
  reviews.seed({ name, rating, comment, status: 'approved' });
}

app.listen(MOCK_PORT);
