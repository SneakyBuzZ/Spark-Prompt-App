"use server";

import { loginSchema, registerSchema } from "@/lib/schemas";
import { db } from "@/utils/db";
import * as z from "zod";
import { getUserByEmail } from "@/actions/getData";
import bcryptjs from "bcryptjs";
import { signIn, signOut } from "@/authentication/auth";
import { defaultLoginRedirect } from "@/utils/route";
import { AuthError } from "next-auth";

export const registerUserAction = async (
  user: z.infer<typeof registerSchema>
) => {
  const validatedFields = registerSchema.safeParse(user);

  if (!validatedFields.success) {
    return {
      status: 400,
      error: "Validation failed",
    };
  }

  const { email, password, name } = validatedFields.data;

  console.log("Validated fields: ", validatedFields);

  const existingUser = await getUserByEmail(email);

  console.log("Existing user: ", existingUser);

  if (existingUser) {
    return {
      status: 400,
      error: "User already exists",
    };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return {
    status: 200,
    message: "User successfully registered",
  };
};

export const loginUserAction = async (user: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(user);

  if (!validatedFields.success) {
    return {
      status: 400,
      error: "Validation failed",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password || !existingUser.password) {
    return {
      status: 400,
      error: "User does not exist",
    };
  }

  const isPasswordCorrect = await bcryptjs.compare(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    return {
      status: 400,
      error: "Incorrect password",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: defaultLoginRedirect,
    });

    return {
      status: 200,
      message: "Login successful",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            status: 400,
            error: "Invalid Credentials",
          };

        default:
          return {
            status: 400,
            error: "Something went wrong kaushik!",
          };
      }
    }

    throw error;
  }
};

export const logoutAction = async () => {
  await signOut({
    redirectTo: "/login",
  });
};
