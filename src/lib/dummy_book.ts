interface IBook {
  title: string;
  description: string;
  tags: string[];
}
export const dummy_books: IBook[] = [
  {
    title: "The Great Gatsby",
    description:
      "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald.",
    tags: ["Fiction", "Classic"],
  },
  {
    title: "The Catcher in the Rye",
    description:
      "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951.",
    tags: ["Fiction", "Classic"],
  },
  {
    title: "To Kill a Mockingbird",
    description:
      "To Kill a Mockingbird is a novel by Harper Lee published in 1960.",
    tags: ["Fiction", "Classic"],
  },
];
