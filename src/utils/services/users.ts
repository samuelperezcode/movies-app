import {db} from "@/lib/db";

export const createUser = async (email: string, password: string) => {
  try {
    const user = await db.user.create({
      data: {
        email,
        password,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};
