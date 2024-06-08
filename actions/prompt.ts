"use server";

import { auth } from "@/authentication/auth";
import { promptSchema } from "@/lib/schemas";
import { db } from "@/utils/db";
import * as z from "zod";

export const createAction = async (prompt: z.infer<typeof promptSchema>) => {
  const validatedFields = promptSchema.safeParse(prompt);

  if (!validatedFields.success) {
    return {
      status: 400,
      error: "Validation failed",
    };
  }

  const session = await auth();

  if (!session?.user) {
    return {
      status: 400,
      error: "Unauthorized",
    };
  }

  const { content } = validatedFields.data;

  await db.prompt.create({
    data: {
      userId: session?.user?.id!,
      content: content,
      createdAt: new Date(),
    },
  });

  return {
    status: 200,
    message: "Prompt created successfully",
  };
};
