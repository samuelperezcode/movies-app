import MovieForm from "@/components/movie-form";

export default function CreateMoviePage() {
  return (
    <section className="flex flex-col gap-y-[120px]">
      <h2 className="mt-[120px] text-5xl font-semibold leading-[56px]">Create a new movie </h2>
      <div className="flex items-start gap-x-[127px]">
        <div className="h-[504px] w-[473px] bg-secondary">Uplaod Image</div>
        <MovieForm />
      </div>
    </section>
  );
}
