import {Card, CardSkeleton} from "@/components/card";
import {getFilteredMovies} from "@/utils/services/movies";

interface MovieListProps {
  currentPage: number;
}

export async function MovieList({currentPage}: MovieListProps) {
  const movies = await getFilteredMovies(currentPage);

  return (
    <ul className="grid w-full grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {movies?.map(({id, cover, publishing_year, title}) => (
        <Card key={id} cover={cover} id={id} publishing_year={publishing_year} title={title} />
      ))}
    </ul>
  );
}

export async function MovieListSekeleton() {
  return (
    <ul className="grid w-full grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </ul>
  );
}
