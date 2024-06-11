"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { defaultLoginRedirect } from "@/route";

export const CardSocial = () => {
  const handleOAuth = async (provider: "google" | "github") => {
    await signIn(provider, {
      callbackUrl: defaultLoginRedirect,
    });
  };
  return (
    <>
      <div className="flex items-center w-full gap-x-2">
        <Button
          onClick={() => handleOAuth("google")}
          variant="outline"
          className="w-full"
        >
          <FcGoogle size={20} />
        </Button>
        <Button
          onClick={() => handleOAuth("github")}
          variant="outline"
          className="w-full"
        >
          <FaGithub size={20} />
        </Button>
      </div>
    </>
  );
};
