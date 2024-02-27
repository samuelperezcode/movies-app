import Link from "next/link";
import {PlusCircle} from "lucide-react";

import {Card} from "@/components/card";
import {LogoutForm} from "@/components/logout-form";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {getSession} from "@/utils/actions/auth";
import {getAllMovies} from "@/utils/services/movies";

export default async function HomePage() {
  const session = await getSession();
  const movies = await getAllMovies();

  const emptyState = movies == null || movies.length === 0;

  return (
    <main className="h-full">
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

          <ul>
            {movies.map(({id, cover, publishing_year, title}) => (
              <Card key={id} cover={cover} publishing_year={publishing_year} title={title} />
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
