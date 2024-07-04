"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPostSchema } from "@/schemas";
import { toast } from "sonner";
import { createPostAction } from "@/actions/post";
import { getAllCategoriesAction } from "@/actions/category";
import { useEffect, useState } from "react";
import { reponseParser } from "@/utils";
import { Category } from "@/interfaces";

export default function CreatePostForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    setIsLoading(true);
    const result = await getAllCategoriesAction();
    setCategories(reponseParser.getJSONResponse(result));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
  });

  const onFormSubmit = async (values: z.infer<typeof createPostSchema>) => {
    const validatedFields = createPostSchema.safeParse(values);

    if (!validatedFields.success) {
      toast.warning("Something went wrong, Please try again later");
      return;
    }

    const createdResponse = await createPostAction(values);

    const toastType = createdResponse.success ? "success" : "error";

    toast[toastType](createdResponse?.message);

    form.reset();
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="space-y-1">
          <label className="font-medium">Title * </label>
          <Controller
            name="title"
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
          {form.formState.errors.title && (
            <p className="text-sm text-red-700">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <label className="font-medium">Description * </label>
          <Controller
            name="description"
            control={form.control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={4}
                disabled={isLoading}
                className="w-full block border border-gray-200 rounded px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            )}
          />
          {form.formState.errors.description && (
            <p className="text-sm text-red-700">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <label className="font-medium">Category * </label>
          <Controller
            name="category"
            control={form.control}
            render={({ field }) => (
              <select
                {...field}
                disabled={isLoading}
                className="w-full block border border-gray-200 rounded px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              >
                {categories.map((category) => (
                  <option key={category?._id} value={category?._id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            )}
          />
          {form.formState.errors.category && (
            <p className="text-sm text-red-700">
              {form.formState.errors.category.message}
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
