"use server";
import type {Movie} from "@prisma/client";

import {revalidatePath} from "next/cache";

import {createMovie} from "../services/movies";

export const addMovie = async (formData: FormData) => {
  const data: Omit<Movie, "id"> = {
    title: formData.get("title") as string,
    cover: "/cover.jpg",
    publishing_year: Number(formData.get("year") as string),
  };

  const movie = await createMovie(data);

  if (movie == null) {
    return "Something went wrong";
  }

  revalidatePath("/");

  return "Movie Created";
};
