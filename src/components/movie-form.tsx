import Link from "next/link";

import {cn} from "@/lib/utils";
import {addMovie} from "@/utils/actions/movies";

import {Input} from "./input";
import {Button, buttonVariants} from "./ui/button";

export default function MovieForm() {
  return (
    <form action={addMovie} className="flex flex-col items-center gap-y-4">
      <Input isRequired name="title" placeholder="Title" type="text" onError />
      <Input isRequired name="year" placeholder="Publishing year" type="text" onError />
      <div className="flex w-full items-center justify-between">
        <Link className={cn(buttonVariants({variant: "outline", size: "lg"}))} href="/">
          Cancel
        </Link>
        <Button size="lg">Submit</Button>
      </div>
    </form>
  );
}
