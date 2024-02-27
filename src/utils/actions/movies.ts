"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import {createMovie} from "../services/movies";
import {CreateMovieSchema} from "../schemas/movies";

// eslint-disable-next-line @typescript-eslint/naming-convention
interface State {
  errors?: {
    title?: string[];
    cover?: string[];
    publishing_year?: string[];
  };
  message?: string | null;
}

export const addMovie = async (prevState: State, formData: FormData) => {
  const validatedFields = CreateMovieSchema.safeParse({
    title: formData.get("title") as string,
    cover: "/cover.jpg",
    publishing_year: Number(formData.get("year") as string),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to Create Movie.",
    };
  }

  const movie = await createMovie(validatedFields.data);

  if (movie == null) {
    return {
      message: "Database Error: Something went wrong",
    };
  }

  revalidatePath("/");
  redirect("/");
};
