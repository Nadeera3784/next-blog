"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { createCategorySchema } from "@/schemas";
import { createCategoryAction } from "@/actions/category";
import { ActionReponse } from "@/interfaces";

export default function CreateCategoryForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onFormSubmit = async (values: z.infer<typeof createCategorySchema>) => {
    const validatedFields = createCategorySchema.safeParse(values);

    if (!validatedFields.success) {
      toast.warning("Something went wrong, Please try again later");
      return;
    }

    setIsLoading(true);
    const createdResponse: ActionReponse = await createCategoryAction(values);
    setIsLoading(false);

    const toastType = createdResponse.success ? "success" : "error";

    toast[toastType](createdResponse?.message);

    form.reset();
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="space-y-1">
          <label className="font-medium">Name * </label>
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                disabled={isLoading}
                className="w-full block border border-gray-200 rounded px-3 py-2 leading-6 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            )}
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-700">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ml-auto"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
