"use client";
import PromptForm from "@/components/prompt/PromptForm";
import { useGetAllPromptQuery } from "@/lib/query/mutations";
import { GetAllPrompt } from "@/lib/types";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function PromptFeed() {
  const { mutateAsync: getAllPrompt } = useGetAllPromptQuery();
  const [prompt, setPrompt] = useState<GetAllPrompt[] | null>();
  useEffect(() => {
    getAllPrompt(10).then((response) => {
      setPrompt(response.prompts);
    });
  }, []);
  return (
    <>
      <section className="py-12 text-gray-100 sm:py-12 lg:py-16">
        <div className="grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto mt-8 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12 lg:mt-20 sm:text-left">
          <PromptForm />

          {prompt?.map((each) => (
            <div className="relative">
              <div className="absolute -inset-1">
                <div className="w-full h-full rotate-180 opacity-30 blur-lg filter bg-gradient-to-r from-blue-400/90 via-rose-500 to-green-600/50"></div>
              </div>
              <div className="relative overflow-hidden bg-white/80 shadow-md rounded-xl h-full flex flex-col justify-start ">
                <div className="p-9">
                  <div className="flex items-center">
                    <Avatar className="scale-90 sm:scale-125 sm:mx-3">
                      <AvatarImage className="" src={each.user.image!} />
                      <AvatarFallback className="text-xs">
                        {each?.user?.name}
                      </AvatarFallback>
                    </Avatar>
                    <span className=" text-2xl font-bold text-gray-900">
                      {each.user.name}
                    </span>
                  </div>
                  <p className="mt-6 pl-2 text-base text-gray-600">
                    {each.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default PromptFeed;
