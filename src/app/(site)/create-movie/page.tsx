import MovieForm from "@/components/movie-form";

export default function CreateMoviePage() {
  return (
    <section className="flex flex-col gap-y-8 md:gap-y-[120px]">
      <h2 className=" px-8 pt-[120px] text-5xl font-semibold leading-[56px] lg:px-0">
        Create a new movie{" "}
      </h2>
      <MovieForm />
    </section>
  );
}
