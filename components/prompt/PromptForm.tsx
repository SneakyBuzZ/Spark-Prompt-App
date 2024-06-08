"use client";

import { IoCreateOutline } from "react-icons/io5";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { promptSchema } from "@/lib/schemas";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePromptQuery } from "@/lib/query/mutations";
import { useToast } from "@/components/ui/use-toast";
import { MoonLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function PromptForm() {
  const router = useRouter();
  const session = useSession();
  const { mutateAsync: createPrompt, isPending } = useCreatePromptQuery();
  const { toast } = useToast();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    if (session) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  const form = useForm<z.infer<typeof promptSchema>>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      content: "",
    },
  });
  async function onSubmit(values: z.infer<typeof promptSchema>) {
    if (!values.content || values.content === "") {
      return;
    }

    const response = await createPrompt(values);

    if (response.message) {
      toast({
        variant: "default",
        description: `${response.message}`,
      });
    } else if (response.error) {
      toast({
        variant: "destructive",
        description: `${response.error}`,
      });
    }

    router.push("/about");
    router.push("/");
  }
  return (
    <>
      <div className="relative">
        <div className="absolute -inset-1">
          <div className="w-full h-full rotate-180 opacity-30 blur-lg filter bg-gradient-to-r from-blue-400/90 via-rose-500 to-green-600/50"></div>
        </div>
        <div className="relative overflow-hidden bg-white/80 rounded-md h-full glassmorphic">
          <div className="flex flex-col p-5">
            <h3 className="text-2xl font-bold text-gray-900 sm:mt-10">
              Write your prompt...
            </h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full my-2 space-y-3"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="bg-gray-100/60 text-neutral-800"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isUserLoggedIn || isPending}
                  className="space-x-1 h-8 w-24 bg-blue-400 hover:bg-blue-500"
                >
                  {isPending ? (
                    <MoonLoader size={10} color="#ffff" />
                  ) : (
                    <>
                      <span className="text-xs text-white">create</span>
                      <IoCreateOutline />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PromptForm;
