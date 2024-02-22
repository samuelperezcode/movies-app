import {Card} from "@/components/card";
import {LogoutForm} from "@/components/logout-form";
import {getSession} from "@/utils/actions/auth";

export default async function HomePage() {
  const session = await getSession();

  return (
    <main>
      <h1>Movies</h1>
      <LogoutForm />
      <Card cover="/cover.jpg" publishing_year={2021} title="Movie 1" />
    </main>
  );
}
