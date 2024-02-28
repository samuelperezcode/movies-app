import Link from "next/link";

import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";

import {RegisterForm} from "./_components/register-form";

export default function RegisterPage() {
  return (
    <section className="flex h-full flex-col items-center gap-y-[40px]">
      <h1 className="text-[64px] font-semibold leading-[60px]">Sign up</h1>
      <RegisterForm />
      <Link className={cn(buttonVariants({variant: "link"}))} href="/sign-in">
        Already have an account? Sign In
      </Link>
    </section>
  );
}
