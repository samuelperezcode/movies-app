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
