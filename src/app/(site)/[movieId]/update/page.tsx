import {notFound} from "next/navigation";

import {getMovieById} from "@/utils/services/movies";

import UpdateForm from "./_components/update-form";

export default async function UpdateMoviePage({params: {movieId}}: {params: {movieId: string}}) {
  const movie = await getMovieById(movieId);

  if (movie == null) {
    notFound();
  }

  return (
    <section className="flex flex-col gap-y-[120px]">
      <h2 className="mt-[120px] text-5xl font-semibold leading-[56px]">Edit movie </h2>
      <div className="flex items-start gap-x-[127px]">
        <UpdateForm movie={movie} />
      </div>
    </section>
  );
}
