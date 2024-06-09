"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, SessionProvider } from "next-auth/react";

const UserAvatar = () => {
  const { data: session } = useSession();
  console.log("AVATAR DATA: ", session);
  return (
    <>
      <SessionProvider>
        <Avatar className="scale-90 sm:scale-125 sm:mx-3">
          <AvatarImage
            className=""
            src={session?.user?.image || "https://github.com/shadcn.png"}
          />
          <AvatarFallback className="text-xs">
            {session?.user?.name}
          </AvatarFallback>
        </Avatar>
      </SessionProvider>
    </>
  );
};

export default UserAvatar;
