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
    <form action={dispatch} className="flex items-start gap-x-[127px]">
      <div className="h-[504px] w-[473px] rounded-[10px] border-2 border-dotted border-white bg-secondary">
        <ImageUpload
          onChange={(url) => {
            if (url) {
              setCover(url);
            }
          }}
        />
        <input readOnly required className="text-black" name="cover" type="text" value={cover} />
      </div>
      <div className="flex flex-col items-center gap-y-4">
        <Input isRequired name="title" placeholder="Title" type="text" onError />
        <Input isRequired name="year" placeholder="Publishing year" type="text" onError />
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
