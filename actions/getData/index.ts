"use server";
import { auth } from "@/authentication/auth";
import { db } from "@/utils/db";

//* GET USER BY EMAIL
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return user;
    }
  } catch (error) {
    throw new Error("Failed to get user by email");
  }
};

//* GET USER BY ID
export const getUserById = async (id: string) => {
  if (!id) {
    return {
      status: 400,
      error: "id is required",
    };
  }

  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return {
        status: 404,
        error: "User doesn't exist",
      };
    }

    return {
      status: 200,
      user,
    };
  } catch (error) {
    return {
      status: 500,
      error: "Failed to get user by id. Please try again",
    };
  }
};

// * GET ALL PROMPT

export const getAllPrompt = async (take: number) => {
  try {
    const prompts = await db.prompt.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      take: take,
      skip: 0,
    });

    return {
      status: 200,
      prompts,
    };
  } catch (error) {
    console.log("Error: ", error);
    return {
      status: 500,
      error: "Failed to get prompts. Please try again",
    };
  }
};
