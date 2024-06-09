"use client";
import { logoutAction } from "@/actions/user";
import React from "react";

type LogoutButtonType = {
  children: React.ReactNode;
};

export const LogoutButton = ({ children }: LogoutButtonType) => {
  const handleClick = async () => {
    await logoutAction();
  };
  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
};
