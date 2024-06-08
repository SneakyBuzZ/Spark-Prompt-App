"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

type LogoutButtonType = {
  children: React.ReactNode;
};

export const LogoutButton = ({ children }: LogoutButtonType) => {
  const router = useRouter();
  const handleClick = async () => {
    await signOut();
    router.push("/login");
  };
  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
};
