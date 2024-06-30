"use client";

import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "@/schemas";
import { FormSuccess, FormError } from "@/components/form";

export const SignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignInSchema>) => {
    setError("");
    setSuccess("");

    // startTransition(() => {
    //   signInAction(values, callbackUrl)
    //     .then((data) => {
    //       if (data?.error) {
    //         form.reset();
    //         setError(data.error);
    //       }
    //       if (data?.success) {
    //         form.reset();
    //         setSuccess(data.success);
    //       }
    //     })
    //     .catch(() => setError("Something went wrong"));
    // });
  };
  return (
    <form
      itemType="post"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 rounded-md"
    >
      <div className="space-y-1">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email *
        </label>
        <Controller
          name="email"
          control={form.control}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              disabled={isPending}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          )}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-700">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password *
        </label>
        <Controller
          name="password"
          control={form.control}
          render={({ field }) => (
            <input
              {...field}
              type="password"
              disabled={isPending}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          )}
        />
        {form.formState.errors.password && (
          <p className="text-sm text-red-700">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>
      <div>
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};
