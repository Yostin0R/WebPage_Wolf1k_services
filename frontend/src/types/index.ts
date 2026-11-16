export interface Service {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  location?: string;
  image: string;
  /** Shown in the "Featured Projects" section on the home page. */
  featured?: boolean;
}

export interface WorkVideo {
  id: number;
  title: string;
  src: string;
  poster: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  createdAt?: string;
}

export interface NewReview {
  name: string;
  rating: number;
  comment: string;
}

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export type FieldErrors<T> = Partial<Record<keyof T, string>>;
