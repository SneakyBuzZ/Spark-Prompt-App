"use client";

import { registerSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegisterQuery } from "@/lib/query/mutations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormError } from "@/components/form/FormError";
import { FormSuccess } from "@/components/form/FormSuccess";
import { MoonLoader } from "react-spinners";

export const RegisterForm = () => {
  const { mutateAsync: registerUser, isPending } = useRegisterQuery();
  const [success, setSuccess] = useState("");
  const [error, SetError] = useState("");
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const response = await registerUser(values);

    if (response?.error) {
      SetError(response.error);
      return;
    } else if (response?.message) {
      setSuccess(response.message);
      return;
    }

    router.push("/login");
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-600">email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-neutral-100"
                    placeholder="johndoe@gmail.com"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-600">name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-neutral-100"
                    placeholder="John Doe"
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
                    type="password"
                    className="bg-neutral-100 "
                    placeholder="*******"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormError label={error} />
          <FormSuccess label={success} />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-700 to-blue-500"
          >
            {isPending ? (
              <>
                <MoonLoader size={20} color="#ffff" />
              </>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
