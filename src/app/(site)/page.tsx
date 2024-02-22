import {Card} from "@/components/card";

export default function HomePage() {
  return (
    <main>
      <h1>Movies</h1>
      <Card cover="/cover.jpg" publishing_year={2021} title="Movie 1" />
    </main>
  );
}
