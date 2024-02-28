import {z} from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password required",
  }),
});

export const RegisterSchema = UserSchema.omit({id: true});

export const LoginSchema = UserSchema.omit({id: true});
