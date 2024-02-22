"use server";

import type {SessionData} from "@/lib/auth";

import {getIronSession} from "iron-session";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

import {sessionOptions, defaultSession} from "@/lib/auth";

//Mock data
const mockEmail = "test@example.com";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  //Check user in DB and Update

  return session;
};

export const login = async (prevState: string | undefined, formData: FormData) => {
  const session = await getSession();

  const email = formData.get("email");
  const password = formData.get("password");

  //Check user in db
  if (email !== mockEmail) {
    return "Email not found";
  }

  //Check corect password

  //Update session
  session.userId = crypto.randomUUID();
  session.email = email;
  session.isLoggedIn = true;

  await session.save();

  redirect("/");
};

export const logout = async () => {
  const session = await getSession();

  session.destroy();
  redirect("/sign-in");
};
