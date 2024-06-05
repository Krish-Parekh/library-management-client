export type TStatCard = "users" | "books" | "authors" | "categories";

export type SearchParams = "id" | "type" | "token";

export type TBookCategory =
  | "fiction"
  | "non-fiction"
  | "fantasy"
  | "biography"
  | "self-help";

export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Author {
  _id: string;
  name: string;
  description: string;
  userId: User;
}

export interface Category {
  _id: string;
  name: string;
  userId: User;
}

export interface Book {
  _id: string;
  title: string;
  description: string;
  authorId: Author;
  isbn: string;
  categoryId: Category;
}

export interface TResponse<T> {
  status: number;
  message: string;
  data: T;
}
