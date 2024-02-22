import MovieForm from "@/components/movie-form";

export default function CreateMoviePage() {
  return (
    <section>
      <h2>Create a new movie </h2>
      <div className="flex items-start gap-x-[127px]">
        <div className="h-[504px] w-[473px] bg-secondary">Uplaod Image</div>
        <MovieForm />
      </div>
    </section>
  );
}
