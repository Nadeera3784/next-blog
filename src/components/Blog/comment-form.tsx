import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { commentSchema } from "@/schemas";
import { createCommentAction } from "@/actions/comment";
import { toast } from "sonner";

interface CommentFormProps {
  postId: string;
  onCommentSubmitted: () => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  onCommentSubmitted,
}) => {
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      email: "",
      name: "",
      comment: "",
    },
  });

  const onCommentFormSubmit = async (values: z.infer<typeof commentSchema>) => {
    const validatedFields = commentSchema.safeParse(values);

    if (!validatedFields.success) {
      toast.warning("Something went wrong, Please try again later");
      return;
    }

    const payload = {
      name: values.name,
      email: values.email,
      comment: values.comment,
      post: postId,
    };

    const createdResponse = await createCommentAction(payload);

    const toastType = createdResponse.success ? "success" : "error";
    toast[toastType](createdResponse.message);

    onCommentSubmitted();
    form.reset();
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Leave a Comment</h2>
      <p className="text-sm text-gray-600 mb-4">
        Your email address will not be published. Required fields are marked *
      </p>
      <form onSubmit={form.handleSubmit(onCommentFormSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name *
            </label>
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
            <label
              htmlFor="email"
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
        </div>
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Comment *
          </label>
          <Controller
            name="comment"
            control={form.control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            )}
          />
          {form.formState.errors.comment && (
            <p className="text-sm text-red-700">
              {form.formState.errors.comment.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};
