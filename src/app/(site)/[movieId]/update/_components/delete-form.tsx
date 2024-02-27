"use client";
import {useFormState} from "react-dom";

import {Button} from "@/components/ui/button";
import {deleteMovie} from "@/utils/actions/movies";

export function DeleteForm({id}: {id: string}) {
  const deleteMovieId = deleteMovie.bind(null, id);
  const [state, dispatch] = useFormState(deleteMovieId, {message: ""});

  return (
    <form action={dispatch}>
      <Button variant="outline">Delete movie</Button>
    </form>
  );
}
