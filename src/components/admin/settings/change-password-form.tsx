"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { passwordChangeSchema } from "@/schemas";
import { updatePasswordAction } from "@/actions/auth";
import { ActionReponse } from "@/interfaces";
import { useSession, signOut } from "next-auth/react";

export default function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof passwordChangeSchema>>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onFormSubmit = async (values: z.infer<typeof passwordChangeSchema>) => {
    const validatedFields = passwordChangeSchema.safeParse(values);

    if (!validatedFields.success) {
      toast.warning("Something went wrong, Please try again later");
      return;
    }

    setIsLoading(true);

    const email = session?.user?.email;

    const createdResponse: ActionReponse = await updatePasswordAction(
      email,
      values.password,
    );

    setIsLoading(false);

    const toastType = createdResponse.success ? "success" : "error";

    toast[toastType](createdResponse?.message);

    form.reset();

    signOut();
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="space-y-1">
          <label className="font-medium">Name * </label>
          <Controller
            name="password"
            control={form.control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                disabled={isLoading}
                className="w-full block border border-gray-200 rounded px-3 py-2 leading-6 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            )}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-700">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <label className="font-medium">Confirm Password * </label>
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                disabled={isLoading}
                className="w-full block border border-gray-200 rounded px-3 py-2 leading-6 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            )}
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-sm text-red-700">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ml-auto"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
