import Link from "next/link";

import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";

import LoginForm from "./_components/login-form";

export default function LoginPage() {
  return (
    <section className="flex h-full flex-col items-center gap-y-[40px]">
      <h1 className="text-[64px] font-semibold leading-[60px]">Sign in</h1>
      <LoginForm />
      <Link className={cn(buttonVariants({variant: "link"}))} href="/sign-up">
        Don&apos;t have an account? Sign Up
      </Link>
    </section>
  );
}
