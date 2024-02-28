import Image from "next/image";
import {notFound} from "next/navigation";
import Link from "next/link";

import {getMovieById} from "@/utils/services/movies";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";

import {DeleteForm} from "./update/_components/delete-form";

export default async function MoviePage({params: {movieId}}: {params: {movieId: string}}) {
  const movie = await getMovieById(movieId);

  if (movie == null) {
    notFound();
  }

  return (
    <section className="h-full w-full pb-40">
      <div className="flex h-full w-full flex-col items-start gap-x-16 gap-y-8 pt-8 lg:flex-row lg:pt-[120px]">
        <div className="mx-auto">
          <Image
            alt={`cover of ${movie.title}`}
            className="h-full rounded-xl object-cover object-center"
            height={400}
            src={movie.cover}
            width={266}
          />
        </div>
        <div className="mx-auto flex flex-col items-start gap-y-4">
          <h2 className="text-5xl font-semibold leading-[56px]">{movie.title}</h2>
          <p className="text-foreground">Published year: {movie.publishing_year}</p>
          <div className="flex items-center gap-x-4">
            <Link className={cn(buttonVariants())} href={`/${movie.id}/update`}>
              Edit movie
            </Link>
            <DeleteForm id={movie.id} />
          </div>
          <Link className={cn(buttonVariants({variant: "link"}))} href="/">
            Go back to movies
          </Link>
        </div>
      </div>
    </section>
  );
}
