import Link from "next/link";

import {Card} from "@/components/card";
import {LogoutForm} from "@/components/logout-form";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {getSession} from "@/utils/actions/auth";
import {getAllMovies} from "@/utils/services/movies";

export default async function HomePage() {
  const session = await getSession();
  const movies = await getAllMovies();

  const emptyState = movies?.length === 0;

  return (
    <main className="h-full">
      {emptyState ? (
        <section className="grid h-full place-content-center">
          <h2>Your movie list is empty</h2>
          <div className="flex items-center gap-4">
            <Link className={cn(buttonVariants({}))} href="/create-movie">
              Add a new movie
            </Link>
            <LogoutForm />
          </div>
        </section>
      ) : (
        <>
          <h1>Welcome {session.email}</h1>
          <LogoutForm />
          <ul>
            {movies?.map(({id, cover, publishing_year, title}) => (
              <Card key={id} cover={cover} publishing_year={publishing_year} title={title} />
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
