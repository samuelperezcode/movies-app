"use client";
import {useFormState, useFormStatus} from "react-dom";

import {Button} from "@/components/ui/button";
import {login} from "@/utils/actions/auth";
import {Input} from "@/components/input";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(login, undefined);

  return (
    <form action={dispatch} className="flex flex-col items-center justify-center gap-y-6">
      <div className="flex flex-col items-start gap-y-2">
        <Input
          isRequired
          name="email"
          placeholder="Email"
          type="email"
          onError={errorMessage === "Email not found"}
        />
        {errorMessage === "Email not found" ? (
          <p className="text-xs font-normal leading-4 text-destructive">{errorMessage}</p>
        ) : null}
      </div>
      <div className="flex flex-col items-start gap-y-2">
        <Input
          isRequired
          name="password"
          placeholder="Password"
          type="password"
          onError={errorMessage === "Password does not matched"}
        />
        {errorMessage === "Password does not matched" ? (
          <p className="text-sm font-normal leading-4 text-destructive">{errorMessage}</p>
        ) : null}
      </div>
      <LoginButton />
    </form>
  );
}

function LoginButton() {
  const {pending} = useFormStatus();

  return (
    <Button aria-disabled={pending} size="login" type="submit" variant="login">
      Login
    </Button>
  );
}
