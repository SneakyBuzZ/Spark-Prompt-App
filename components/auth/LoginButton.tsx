"use client";
import React from "react";
import { useRouter } from "next/navigation";

type LoginButtonType = {
  children: React.ReactNode;
};

export const LoginButton = ({ children }: LoginButtonType) => {
  const router = useRouter();
  const handleClick = async () => {
    router.push("/login");
  };
  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
};
