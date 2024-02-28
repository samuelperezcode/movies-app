"use client";
import Link from "next/link";
import {useFormState, useFormStatus} from "react-dom";
import {Loader2} from "lucide-react";
import {useState} from "react";

import {cn} from "@/lib/utils";
import {addMovie} from "@/utils/actions/movies";

import {Input} from "./input";
import {Button, buttonVariants} from "./ui/button";
import {ImageUpload} from "./image-upload";

export default function MovieForm() {
  const initialState = {message: "", errors: {}};
  const [state, dispatch] = useFormState(addMovie, initialState);
  const [cover, setCover] = useState<string>("");

  return (
    <form
      action={dispatch}
      className="mx-auto flex flex-col items-start gap-x-[127px] gap-y-8 px-8 md:gap-x-8 lg:mx-0 lg:flex-row"
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
          className="absolute bottom-2 left-10 w-52 bg-input text-primary outline-none sm:left-[50px] sm:w-[373px]"
          name="cover"
          type="text"
          value={cover}
        />
      </div>
      <div className="flex flex-col items-center gap-y-4">
        <Input
          isRequired
          name="title"
          placeholder="Title"
          type="text"
          onError={!!state.errors?.title}
        />
        <Input
          isRequired
          name="year"
          placeholder="Publishing year"
          type="text"
          onError={!!state.errors?.publishing_year}
        />
        <div className="flex w-full items-center justify-between">
          <Link className={cn(buttonVariants({variant: "outline", size: "lg"}))} href="/">
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
      {pending ? <Loader2 /> : "Submit"}
    </Button>
  );
}
