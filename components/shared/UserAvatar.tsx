"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getUserPromptCount } from "@/actions/getData";

const UserAvatar = () => {
  const { data: session } = useSession();
  const [promptCount, setPromptCount] = useState(0);
  useEffect(() => {
    if (session?.user?.id) {
      getUserPromptCount(session?.user?.id).then((response) => {
        setPromptCount(response.count);
      });
    }
  }, []);
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Avatar className="scale-90 sm:scale-125 sm:mx-3">
            <AvatarImage
              className=""
              src={session?.user?.image || "https://github.com/shadcn.png"}
            />
            <AvatarFallback className="text-xs">
              {session?.user?.name}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex w-full justify-center items-center">
            <div className="flex justify-start items-start gap-3">
              <Avatar className="scale-90 sm:scale-100 sm:mx-3">
                <AvatarImage
                  className=""
                  src={session?.user?.image || "https://github.com/shadcn.png"}
                />
                <AvatarFallback className="text-xs">
                  {session?.user?.name}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start justify-center">
                <h1 className="font-semibold">{session?.user?.name}</h1>
                <h1 className="text-xs">{session?.user?.email}</h1>
                <div className="flex mt-2 items-center justify-between w-full">
                  <h1 className="text-sm">Prompts : {promptCount}</h1>
                  {/* <UserRoundCog size={16} /> */}
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default UserAvatar;
