"use client";
import PromptForm from "@/components/prompt/PromptForm";
import { useGetAllPromptQuery } from "@/lib/query/mutations";
import { GetAllPrompt } from "@/lib/types";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

function PromptFeed() {
  const { mutateAsync: getAllPrompt, isPending } = useGetAllPromptQuery();
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
            <div className="relative" key={each.id}>
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
          {isPending ? (
            <>
              <Skeleton className="relative flex flex-col  justify-start p-10 gap-2">
                <Skeleton className="border w-2/3 h-10 bg-neutral-400"></Skeleton>
                <Skeleton className="border w-2/3 h-7 bg-neutral-400"></Skeleton>
                <Skeleton className="border w-1/3 h-7 bg-neutral-400"></Skeleton>
              </Skeleton>
              <Skeleton className="relative flex flex-col  justify-start p-10 gap-2">
                <Skeleton className="border w-2/3 h-10 bg-neutral-400"></Skeleton>
                <Skeleton className="border w-2/3 h-7 bg-neutral-400"></Skeleton>
                <Skeleton className="border w-1/3 h-7 bg-neutral-400"></Skeleton>
              </Skeleton>
              <Skeleton className="relative flex flex-col  justify-start p-10 gap-2">
                <Skeleton className="border w-2/3 h-10 bg-neutral-400"></Skeleton>
                <Skeleton className="border w-2/3 h-7 bg-neutral-400"></Skeleton>
                <Skeleton className="border w-1/3 h-7 bg-neutral-400"></Skeleton>
              </Skeleton>
              <Skeleton className="relative flex flex-col  justify-start p-10 gap-2">
                <Skeleton className="border w-2/3 h-10 bg-neutral-400"></Skeleton>
                <Skeleton className="border w-2/3 h-7 bg-neutral-400"></Skeleton>
                <Skeleton className="border w-1/3 h-7 bg-neutral-400"></Skeleton>
              </Skeleton>
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
}

export default PromptFeed;
