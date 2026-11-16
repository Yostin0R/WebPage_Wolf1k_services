import type { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { REVIEW_STATUS, REVIEWS_PAGE_SIZE } from '../config/constants.js';
import type { NewReview, PublicReview } from '../types/review.js';

export interface ReviewRepository {
  findApproved(): Promise<PublicReview[]>;
  /** Stores the review as pending and returns its id. */
  create(review: NewReview): Promise<number>;
}

interface ReviewRow extends RowDataPacket {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at: Date;
}

export class MySqlReviewRepository implements ReviewRepository {
  constructor(private readonly pool: Pool) {}

  async findApproved(): Promise<PublicReview[]> {
    const [rows] = await this.pool.query<ReviewRow[]>(
      `SELECT id, name, rating, comment, created_at
         FROM reviews
        WHERE status = ?
        ORDER BY created_at DESC, id DESC
        LIMIT ?`,
      [REVIEW_STATUS.approved, REVIEWS_PAGE_SIZE],
    );
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      rating: row.rating,
      comment: row.comment,
      createdAt: new Date(row.created_at).toISOString(),
    }));
  }

  async create(review: NewReview): Promise<number> {
    const [result] = await this.pool.execute<ResultSetHeader>(
      'INSERT INTO reviews (name, rating, comment, status) VALUES (?, ?, ?, ?)',
      [review.name, review.rating, review.comment, REVIEW_STATUS.pending],
    );
    return result.insertId;
  }
}
