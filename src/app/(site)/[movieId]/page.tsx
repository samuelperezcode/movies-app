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
    <section className="flex h-full">
      <div>
        <Image alt={`cover of ${movie.title}`} height={500} src={movie.cover} width={250} />
      </div>
      <div>
        <h2>{movie.title}</h2>
        <p>{movie.publishing_year}</p>
        <div className="flex items-center justify-between">
          <Link className={cn(buttonVariants())} href={`/${movie.id}/update`}>
            Edit movie
          </Link>
          <DeleteForm id={movie.id} />
        </div>
        <Link className={cn(buttonVariants({variant: "link"}))} href="/">
          Go back to movies
        </Link>
      </div>
    </section>
  );
}
