import type {Movie} from "@prisma/client";

import {db} from "@/lib/db";

export const getAllMovies = async () => {
  try {
    const movies = await db.movie.findMany();

    return movies;
  } catch (error) {
    return null;
  }
};

const ITEMS_PER_PAGE = 8;

export const getFilteredMovies = async (currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const movies = await db.movie.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      orderBy: {
        title: "asc",
      },
    });

    return movies;
  } catch (error) {
    return null;
  }
};

export async function getMoviesPages() {
  try {
    const count = await db.movie.count();

    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);

    return totalPages;
  } catch (error) {
    return null;
  }
}

export const createMovie = async ({title, cover, publishing_year}: Omit<Movie, "id">) => {
  try {
    const movie = await db.movie.create({
      data: {
        title,
        cover,
        publishing_year,
      },
    });

    return movie;
  } catch (error) {
    return null;
  }
};
