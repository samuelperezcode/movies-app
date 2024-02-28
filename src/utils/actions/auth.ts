"use server";

import type {SessionData} from "@/lib/auth";

import {getIronSession} from "iron-session";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import bcrypt from "bcryptjs";

import {sessionOptions, defaultSession} from "@/lib/auth";

import {LoginSchema} from "../schemas/users";
import {createUser, getUserByEmail} from "../services/users";

// eslint-disable-next-line @typescript-eslint/naming-convention
interface State {
  errors?: {
    email?: string[];
    cpassword?: string[];
  };
  message?: string | null;
}

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  //Check user in DB and Update

  return session;
};

export const login = async (prevState: State, formData: FormData) => {
  const session = await getSession();

  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to Login User",
    };
  }

  const {email, password} = validatedFields.data;

  //Check user in db
  const user = await getUserByEmail(email);

  if (!user) {
    return {
      message: "Email not found",
    };
  }

  //Check correct password
  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    return {
      message: "Password not correct",
    };
  }

  //Update session
  session.userId = user.id;
  session.email = user.email;
  session.isLoggedIn = true;

  await session.save();

  redirect("/");
};

export const register = async (prevState: State, formData: FormData) => {
  const session = await getSession();

  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to Login User",
    };
  }

  const {email, password} = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 4);

  //Create user in db
  const user = await createUser(email, hashedPassword);

  if (!user) {
    return {
      message: "Something went wrong",
    };
  }

  //Update session
  session.userId = user.id;
  session.email = user.email;
  session.isLoggedIn = true;

  await session.save();

  redirect("/");
};

export const logout = async () => {
  const session = await getSession();

  session.destroy();
  redirect("/sign-in");
};
