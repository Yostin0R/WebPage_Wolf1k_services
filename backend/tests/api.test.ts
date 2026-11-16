import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { buildTestApp, type TestContext } from './helpers.js';

const API = '/api/v1';

const validReview = { name: 'Jane Doe', rating: 5, comment: 'Beautiful crown molding work.' };

let ctx: TestContext;

beforeEach(() => {
  ctx = buildTestApp();
});

describe('GET /health', () => {
  it('reports the service as healthy', async () => {
    const res = await request(ctx.app).get(`${API}/health`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok', service: 'wolf1k-api' });
  });

  it('sends security headers and hides the framework', async () => {
    const res = await request(ctx.app).get(`${API}/health`);
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});

describe('GET /reviews', () => {
  it('returns only approved reviews', async () => {
    ctx.reviews.seed({ name: 'Approved', rating: 5, comment: 'Visible review text', status: 'approved' });
    ctx.reviews.seed({ name: 'Pending', rating: 4, comment: 'Hidden review text', status: 'pending' });
    ctx.reviews.seed({ name: 'Rejected', rating: 1, comment: 'Hidden review text', status: 'rejected' });

    const res = await request(ctx.app).get(`${API}/reviews`);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0]).toMatchObject({ name: 'Approved', rating: 5 });
    expect(res.body.data[0]).not.toHaveProperty('status');
  });

  it('does not leak database errors', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    ctx.reviews.failNext = true;

    const res = await request(ctx.app).get(`${API}/reviews`);

    expect(res.status).toBe(500);
    expect(res.body.error.code).toBe('INTERNAL_ERROR');
    expect(JSON.stringify(res.body)).not.toMatch(/ER_NO_SUCH_TABLE|wolf1k\.reviews/);
    spy.mockRestore();
  });
});

describe('POST /reviews', () => {
  it('stores a valid review as pending and does not publish it', async () => {
    const res = await request(ctx.app).post(`${API}/reviews`).send(validReview);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Thank you! Your review has been submitted for approval.');
    expect(ctx.reviews.rows[0]).toMatchObject({ ...validReview, status: 'pending' });

    const list = await request(ctx.app).get(`${API}/reviews`);
    expect(list.body.data).toEqual([]);
  });

  it('ignores a client-supplied status (cannot self-approve)', async () => {
    const res = await request(ctx.app)
      .post(`${API}/reviews`)
      .send({ ...validReview, status: 'approved' });
    expect(res.status).toBe(400);
    expect(ctx.reviews.rows).toHaveLength(0);
  });

  it.each([
    ['missing name', { rating: 5, comment: 'Great work on the doors.' }, 'name'],
    ['rating too high', { ...validReview, rating: 6 }, 'rating'],
    ['rating too low', { ...validReview, rating: 0 }, 'rating'],
    ['decimal rating', { ...validReview, rating: 4.5 }, 'rating'],
    ['rating as string', { ...validReview, rating: '5' }, 'rating'],
    ['comment too short', { ...validReview, comment: 'ok' }, 'comment'],
    ['comment too long', { ...validReview, comment: 'x'.repeat(1001) }, 'comment'],
  ])('rejects %s', async (_label, body, field) => {
    const res = await request(ctx.app).post(`${API}/reviews`).send(body);
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
    expect(res.body.error.details.map((d: { field: string }) => d.field)).toContain(field);
    expect(ctx.reviews.rows).toHaveLength(0);
  });

  it('strips HTML from text fields', async () => {
    await request(ctx.app)
      .post(`${API}/reviews`)
      .send({ name: '<b>Jane</b>  Doe', rating: 5, comment: 'Great <script>alert(1)</script> trim work!' });
    expect(ctx.reviews.rows[0]?.name).toBe('Jane Doe');
    expect(ctx.reviews.rows[0]?.comment).toBe('Great alert(1) trim work!');
  });
});

describe('request body handling', () => {
  it('rejects malformed JSON', async () => {
    const res = await request(ctx.app)
      .post(`${API}/reviews`)
      .set('Content-Type', 'application/json')
      .send('{"name": ');
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('INVALID_JSON');
  });

  it('rejects oversized payloads', async () => {
    const res = await request(ctx.app)
      .post(`${API}/reviews`)
      .send({ ...validReview, comment: 'x'.repeat(20_000) });
    expect(res.status).toBe(413);
  });
});

describe('rate limiting', () => {
  it('blocks form submissions past the limit but keeps reads available', async () => {
    const limited = buildTestApp({
      rateLimit: { general: { windowMs: 60_000, max: 1000 }, form: { windowMs: 60_000, max: 2 } },
    });

    const first = await request(limited.app).post(`${API}/reviews`).send(validReview);
    const second = await request(limited.app).post(`${API}/reviews`).send(validReview);
    const third = await request(limited.app).post(`${API}/reviews`).send(validReview);

    expect(first.status).toBe(201);
    expect(second.status).toBe(201);
    expect(third.status).toBe(429);
    expect(third.body.error.code).toBe('RATE_LIMITED');
    expect(limited.reviews.rows).toHaveLength(2);

    const read = await request(limited.app).get(`${API}/reviews`);
    expect(read.status).toBe(200);
  });
});

describe('unknown routes and CORS', () => {
  it('returns a JSON 404', async () => {
    const res = await request(ctx.app).get(`${API}/estimates`);
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });

  it('does not expose a contact endpoint (the site stores no contact messages)', async () => {
    const res = await request(ctx.app)
      .post(`${API}/contact`)
      .send({ fullName: 'John Smith', email: 'john@example.com', message: 'Hello there, WOLF1K.' });
    expect(res.status).toBe(404);
  });

  it('only allows configured origins', async () => {
    const allowed = await request(ctx.app).get(`${API}/health`).set('Origin', 'http://localhost:5173');
    const blocked = await request(ctx.app).get(`${API}/health`).set('Origin', 'https://evil.example');
    expect(allowed.headers['access-control-allow-origin']).toBe('http://localhost:5173');
    expect(blocked.headers['access-control-allow-origin']).toBeUndefined();
  });
});
