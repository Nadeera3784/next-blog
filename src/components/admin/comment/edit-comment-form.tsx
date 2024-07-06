"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { updateCommentSchema } from "@/schemas";
import {
  getCommentByIdAction,
  updateCommentByIdaction,
} from "@/actions/comment";
import { reponseParser } from "@/utils";
import { ActionReponse, Comment } from "@/interfaces";

export default function EditCommentForm(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState<Comment | null>(null);
  const [refresh, setRefresh] = useState(0);

  const form = useForm<z.infer<typeof updateCommentSchema>>({
    resolver: zodResolver(updateCommentSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: "",
    },
  });

  const getData = async () => {
    setIsLoading(true);
    const result = await getCommentByIdAction(id);
    setComment(reponseParser.getJSONResponse(result));
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [refresh]);

  useEffect(() => {
    form.reset({
      name: comment?.name,
      email: comment?.email,
      comment: comment?.comment,
    });
  }, [comment]);

  const onFormSubmit = async (values: z.infer<typeof updateCommentSchema>) => {
    const validatedFields = updateCommentSchema.safeParse(values);

    if (!validatedFields.success) {
      toast.warning("Something went wrong, Please try again later");
      return;
    }

    setIsLoading(true);
    const updateResponse: ActionReponse = await updateCommentByIdaction(
      id,
      values,
    );
    setIsLoading(false);

    const toastType = updateResponse.success ? "success" : "error";

    toast[toastType](updateResponse?.message);

    setRefresh(refresh + 1);
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-6 mt-5">
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
        <div className="space-y-1">
          <label className="font-medium">Email * </label>
          <Controller
            name="email"
            control={form.control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                disabled={isLoading}
                className="w-full block border border-gray-200 rounded px-3 py-2 leading-6 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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
          <label className="font-medium">Comment * </label>
          <Controller
            name="comment"
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
          {form.formState.errors.comment && (
            <p className="text-sm text-red-700">
              {form.formState.errors.comment.message}
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
