import Link from "next/link";
import {PlusCircle} from "lucide-react";
import {Suspense} from "react";

import {LogoutForm} from "@/components/logout-form";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {getMoviesPages} from "@/utils/services/movies";

import {MovieList} from "./_components/movie-list";
import Pagination from "./_components/pagination";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getMoviesPages();

  const emptyState = totalPages == null || totalPages === 0;

  return (
    <>
      {emptyState ? (
        <section className="grid h-full place-content-center gap-10">
          <h2 className=" text-5xl font-semibold leading-[56px]">Your movie list is empty</h2>
          <div className="flex items-center justify-center gap-4">
            <Link
              className={cn(buttonVariants({className: "text-base font-bold text-white"}))}
              href="/create-movie"
            >
              Add a new movie
            </Link>
          </div>
        </section>
      ) : (
        <>
          <header className="flex items-center justify-between py-[120px]">
            <div className="flex items-center gap-x-2">
              <h2 className="text-5xl font-semibold leading-[56px]">My Movies</h2>
              <Link href="/create-movie">
                <PlusCircle className="h-8 w-8" />
              </Link>
            </div>
            <LogoutForm />
          </header>

          <Suspense key={currentPage} fallback={<p>Loading...</p>}>
            <MovieList currentPage={currentPage} />
          </Suspense>
          <div className="flex w-full justify-center pt-[120px]">
            <Pagination totalPages={totalPages} />
          </div>
        </>
      )}
    </>
  );
}
