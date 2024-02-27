"use server";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import {db} from "@/lib/db";

import {createMovie, editMovie} from "../services/movies";
import {CreateMovieSchema, UpdateMovieSchema} from "../schemas/movies";

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

export const updateMovie = async (id: string, prevState: State, formData: FormData) => {
  const validatedFields = UpdateMovieSchema.safeParse({
    title: formData.get("title") as string,
    cover: "/cover.jpg",
    publishing_year: Number(formData.get("year") as string),
  });

  if (!validatedFields.success) {
    console.log({errors: validatedFields.error.flatten().fieldErrors});

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to Update Movie.",
    };
  }

  const {title, cover, publishing_year} = validatedFields.data;
  const movie = await editMovie({id, title, cover, publishing_year});

  if (movie == null) {
    return {
      message: "Database Error: Something went wrong",
    };
  }

  revalidatePath("/");
  revalidatePath(`/${id}`);
  redirect(`/${id}`);
};

export async function deleteMovie(id: string) {
  try {
    await db.movie.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");

    return {message: "Deleted Movie"};
  } catch (error) {
    return {message: "Database Error: Failed to Delete Movie."};
  }
}
