"use client";
import PromptForm from "@/components/prompt/PromptForm";
import {
  useDeletePromptQuery,
  useEditPromptQuery,
  useGetAllPromptQuery,
} from "@/lib/query/mutations";
import { GetAllPrompt } from "@/lib/types";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { FilePenLine, Trash2 } from "lucide-react";
import { SessionProvider, useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import { MoonLoader } from "react-spinners";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function PromptFeed() {
  const { toast } = useToast();
  const { data } = useSession();
  const { mutateAsync: getAllPrompt, isPending } = useGetAllPromptQuery();
  const { mutateAsync: editPrompt, isPending: isPromptEditing } =
    useEditPromptQuery();
  const { mutateAsync: deletePrompt } = useDeletePromptQuery();

  const [prompt, setPrompt] = useState<GetAllPrompt[] | null>();
  const [showPromptEdit, setShowPromptEdit] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editPromptId, setEditPromptId] = useState("");

  const handleEditPrompt = async (promptId: string) => {
    const response = await editPrompt({ content: editContent, promptId });
    if (response.status === 200) {
      toast({
        variant: "default",
        description: `${response.message}`,
      });
    } else {
      toast({
        variant: "destructive",
        description: `${response.error}`,
      });
    }

    setEditContent("");
    setShowPromptEdit(false);
  };

  const handleDeletePrompt = async (promptId: string) => {
    const response = await deletePrompt(promptId);
    if (response.status === 200) {
      toast({
        variant: "default",
        description: `${response.message}`,
      });
    }
    window.location.reload();
  };

  useEffect(() => {
    getAllPrompt(10).then((response) => {
      setPrompt(response.prompts);
    });
  }, [data, editContent]);

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
              <div className="border border-neutral-300 relative overflow-hidden bg-white/80 shadow-md rounded-xl h-full flex flex-col justify-between ">
                <div className="p-9">
                  <div className="flex items-center gap-2">
                    <Avatar className="scale-90 sm:scale-125 sm:mx-3">
                      <AvatarImage
                        className=""
                        src={
                          each.user.image! || "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback className="text-xs">
                        {each?.user?.name}
                      </AvatarFallback>
                    </Avatar>
                    <span className=" text-xl font-bold text-gray-700">
                      {each.user.name}
                    </span>
                  </div>
                  {showPromptEdit && editPromptId === each.id ? (
                    <>
                      <Textarea
                        onChange={(e) => setEditContent(e.target.value)}
                        value={editContent || each.content}
                        className="mt-6 pl-2 text-base text-gray-600 min-h-40 bg-transparent"
                      />
                      <div className="w-full flex justify-end mt-2 gap-2">
                        <Button
                          onClick={() => handleEditPrompt(each.id)}
                          className=" h-8 w-16 bg-blue-400 hover:bg-blue-500"
                        >
                          {isPromptEditing ? (
                            <MoonLoader size={10} color="#ffff" />
                          ) : (
                            <>edit</>
                          )}
                        </Button>
                        <Button
                          className="h-8 w-16 bg-rose-400 hover:bg-rose-500"
                          onClick={() => setShowPromptEdit(false)}
                        >
                          cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="mt-6 pl-2 text-base text-gray-600">
                        {each.content}
                      </p>
                    </>
                  )}
                </div>
                <SessionProvider>
                  {!showPromptEdit && (
                    <>
                      {data?.user?.id === each.userId && (
                        <>
                          <div className="ml-auto mr-4 mb-4 flex gap-2 items-center">
                            <FilePenLine
                              onClick={() => {
                                setShowPromptEdit((state) => !state);
                                setEditPromptId(each.id);
                              }}
                              height={18}
                              className="cursor-pointer"
                              color="#3F3F3F"
                            />
                            <AlertDialog>
                              <AlertDialogTrigger>
                                <Trash2
                                  height={18}
                                  className="cursor-pointer"
                                  color="#3F3F3F"
                                />
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your prompt and content
                                    from it.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeletePrompt(each.id)}
                                  >
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </SessionProvider>
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
