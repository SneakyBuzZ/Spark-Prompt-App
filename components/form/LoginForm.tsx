"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginSchema } from "@/lib/schemas";
import { FormError } from "@/components/form/FormError";
import { FormSuccess } from "@/components/form/FormSuccess";
import { useLoginQuery } from "@/lib/query/mutations";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MoonLoader } from "react-spinners";
import { useToast } from "../ui/use-toast";

export const LoginForm = () => {
  const params = useSearchParams();
  const urlError =
    params.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with another provider"
      : "";

  const { mutateAsync: loginAction, isPending } = useLoginQuery();
  const [success, setSuccess] = useState("");
  const [error, SetError] = useState("");
  const { toast } = useToast();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const response = await loginAction(values);
    if (response?.error) {
      SetError(response.error);
      return;
    } else if (response?.message) {
      setSuccess(response.message);
      toast({
        variant: "default",
        description: `${response.message}`,
      });
      return;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-600">email</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@gmail.com"
                  className="bg-neutral-100"
                  disabled={true}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-600">password</FormLabel>
              <FormControl>
                <Input
                  placeholder="*******"
                  className="bg-neutral-100"
                  disabled={true}
                  type="password"
                  {...field}
                />
              </FormControl>
              <Button
                asChild
                disabled={true}
                variant={"link"}
                className="-translate-x-3 "
                size={"sm"}
              >
                <Link href="/reset">Forgot Password?</Link>
              </Button>
            </FormItem>
          )}
        />
        <FormError label={error || urlError} />
        <FormSuccess label={success} />

        <Button
          disabled={isPending}
          type="submit"
          className="w-full bg-gradient-to-r from-blue-700 to-blue-500"
        >
          {isPending ? <MoonLoader size={20} color="#ffff" /> : "Login"}
        </Button>
      </form>
    </Form>
  );
};
