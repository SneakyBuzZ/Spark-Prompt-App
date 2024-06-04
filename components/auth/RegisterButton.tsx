"use client";
import React from "react";
import { useRouter } from "next/navigation";

type RegisterButtonProps = {
  children: React.ReactNode;
};

export const RegisterButton = ({ children }: RegisterButtonProps) => {
  const router = useRouter();
  const handleClick = async () => {
    router.push("/register");
  };
  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default RegisterButton;
