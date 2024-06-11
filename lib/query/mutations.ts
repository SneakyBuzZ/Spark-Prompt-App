"use client";

import { useMutation } from "@tanstack/react-query";

import { loginUserAction, registerUserAction } from "@/actions/user";
import { CreatePrompt, EditPrompt, UserLogin, UserRegister } from "@/lib/types";
import { createAction, editPromptAction } from "@/actions/prompt";
import { getAllPrompt } from "@/actions/getData";

// * ################ USER ######################

export const useLoginQuery = () => {
  return useMutation({
    mutationFn: (user: UserLogin) => loginUserAction(user),
  });
};

export const useRegisterQuery = () => {
  return useMutation({
    mutationFn: (user: UserRegister) => registerUserAction(user),
  });
};

//* ############### PROMPT #####################

export const useCreatePromptQuery = () => {
  return useMutation({
    mutationFn: (prompt: CreatePrompt) => createAction(prompt),
  });
};

export const useEditPromptQuery = () => {
  return useMutation({
    mutationFn: (prompt: EditPrompt) => editPromptAction(prompt),
  });
};

export const useGetAllPromptQuery = () => {
  return useMutation({
    mutationFn: (take: number) => getAllPrompt(take),
  });
};
