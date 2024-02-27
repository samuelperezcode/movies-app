import {z} from "zod";

export const MovieSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    message: "Title is required",
  }),
  publishing_year: z.number().max(new Date().getFullYear(), {
    message: "Invalid year",
  }),
  cover: z.string(),
});

export const CreateMovieSchema = MovieSchema.omit({id: true});

export const UpdateMovieSchema = MovieSchema.omit({id: true});
