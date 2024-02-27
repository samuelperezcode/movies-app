"use client";
import type {Movie} from "@prisma/client";

import {useFormState, useFormStatus} from "react-dom";
import Link from "next/link";
import {Loader2} from "lucide-react";

import {Input} from "@/components/input";
import {Button, buttonVariants} from "@/components/ui/button";
import {updateMovie} from "@/utils/actions/movies";
import {cn} from "@/lib/utils";

export default function UpdateForm({movie}: {movie: Movie}) {
  const initialState = {message: "", errors: {}};
  const dispatchWithId = updateMovie.bind(null, movie.id);
  const [state, dispatch] = useFormState(dispatchWithId, initialState);

  return (
    <form action={dispatch} className="flex flex-col items-center gap-y-4">
      <Input
        isRequired
        defaultValue={movie.title}
        name="title"
        placeholder="Title"
        type="text"
        onError
      />
      <Input
        isRequired
        defaultValue={movie.publishing_year}
        name="year"
        placeholder="Publishing year"
        type="text"
        onError
      />
      <div className="flex w-full items-center justify-between">
        <Link
          className={cn(buttonVariants({variant: "outline", size: "lg"}))}
          href={`/${movie.id}`}
        >
          Cancel
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const {pending} = useFormStatus();

  return (
    <Button disabled={pending} size="lg" type="submit">
      {pending ? <Loader2 /> : "Update"}
    </Button>
  );
}
