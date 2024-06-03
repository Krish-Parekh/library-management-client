export type TStatCard = "users" | "books";

export type TBookCategory = "fiction"| "non-fiction" | "fantasy" | "biography" | "self-help";

export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  _id: string;
  title: string;
  description: string;
  author: string;
  isbn: string;
  category: TBookCategory;
}

export interface TResponse<T> {
  status: number;
  message: string;
  data: T;
}
