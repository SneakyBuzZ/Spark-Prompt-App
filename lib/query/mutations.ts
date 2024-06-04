"use client";

import { useMutation } from "@tanstack/react-query";

import { loginUserAction, registerUserAction } from "@/actions/user";
import { UserLogin, UserRegister } from "@/lib/types";

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
