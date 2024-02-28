"use client";
import type {Movie} from "@prisma/client";

import {useFormState, useFormStatus} from "react-dom";
import Link from "next/link";
import {Loader2} from "lucide-react";
import {useState} from "react";

import {Input} from "@/components/input";
import {Button, buttonVariants} from "@/components/ui/button";
import {updateMovie} from "@/utils/actions/movies";
import {cn} from "@/lib/utils";
import {ImageUpload} from "@/components/image-upload";

export default function UpdateForm({movie}: {movie: Movie}) {
  const initialState = {message: "", errors: {}};
  const dispatchWithId = updateMovie.bind(null, movie.id);
  const [state, dispatch] = useFormState(dispatchWithId, initialState);
  const [cover, setCover] = useState<string>(movie.cover);

  return (
    <form
      action={dispatch}
      className="mx-auto flex flex-col items-start gap-y-8 px-8 md:gap-x-8 lg:mx-0 lg:flex-row lg:gap-x-[127px]"
    >
      <div className="relative h-[504px] w-72 rounded-[10px] border-2 border-dotted border-white bg-input sm:w-[473px]">
        <ImageUpload
          onChange={(url) => {
            if (url) {
              setCover(url);
            }
          }}
        />
        <input
          readOnly
          required
          className="absolute bottom-2 left-10 w-52 bg-input text-primary outline-none md:left-[50px] md:w-[373px]"
          name="cover"
          type="text"
          value={cover}
        />
      </div>
      <div className="flex flex-col items-center gap-y-4">
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
