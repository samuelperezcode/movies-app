"use client";
import {useFormState, useFormStatus} from "react-dom";
import {AlertCircleIcon} from "lucide-react";

import {Button} from "@/components/ui/button";
import {register} from "@/utils/actions/auth";
import {Input} from "@/components/input";

export function RegisterForm() {
  const initialState = {message: "", errors: {}};
  const [errorMessage, dispatch] = useFormState(register, initialState);

  return (
    <form action={dispatch} className="flex flex-col items-center justify-center gap-y-6">
      <div className="flex flex-col items-start gap-y-2">
        <Input
          isRequired
          name="email"
          placeholder="Email"
          type="email"
          onError={!!errorMessage.errors?.email}
        />
        {!!errorMessage.errors?.email ? (
          <p className="text-xs font-normal leading-4 text-destructive">
            {errorMessage.errors.email}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col items-start gap-y-2">
        <Input
          isRequired
          name="password"
          placeholder="Password"
          type="password"
          onError={!!errorMessage.errors?.password}
        />
        {!!errorMessage.errors?.password ? (
          <p className="text-sm font-normal leading-4 text-destructive">
            {errorMessage.errors.password}
          </p>
        ) : null}
      </div>
      <LoginButton />
      <div aria-atomic="true" aria-live="polite" className="flex h-8 items-end space-x-1">
        {errorMessage.message ? (
          <>
            <AlertCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage.message}</p>
          </>
        ) : null}
      </div>
    </form>
  );
}

function LoginButton() {
  const {pending} = useFormStatus();

  return (
    <Button aria-disabled={pending} size="login" type="submit" variant="login">
      Create Account
    </Button>
  );
}
