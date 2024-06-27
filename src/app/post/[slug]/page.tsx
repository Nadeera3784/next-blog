'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link'
import { useParams } from "next/navigation";
import { getPostBySlugAction } from '@/actions/post';
import { createCommentAction, getCommentsByPostAction} from '@/actions/comment';
import { Post, Comment} from '@/interfaces';
import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { commentSchema } from '@/schemas';
import { toast } from 'sonner';

export default function BlogDetails() {
    const urlParams = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            email: '',
            name: '',
            comment: '',
        },
    });

    const getPost = async (slug: string) => {
        setIsLoading(true);
        try {
            const data = await getPostBySlugAction(slug);
            setPost(data);
            setRefresh(true);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getComments = async () => {
        setIsLoading(true);
        try {
            if(post?._id){
                const data = await getCommentsByPostAction(post?._id);
                setComments(data);
            }

        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getPost(urlParams?.slug);
    }, []);

    useEffect(() => {
        getComments();
        console.log('BOOM');
    }, [refresh]);

    const onCommentFormSubmit = async (values: z.infer<typeof commentSchema>) => {

        const validatedFields = commentSchema.safeParse(values);

        if (!validatedFields.success) {
            toast.warning('Something went wrong, Please try again later');
            return;
        }

        const payload = {
            name: values.name,
            email: values.email,
            comment: values.comment,
            post: post?._id
        };
        
        const createdReponse =  await createCommentAction(payload);

        const toastType = createdReponse.success ? 'success' : 'error';

        toast[toastType](createdReponse.message);

        setRefresh(false);

        form.reset();
    }

    return (
        <div className="mx-auto">
            <div className="mx-auto mt-14">
                <h1
                    className="text-4xl lg:text-5xl font-bold lg:tracking-tight mt-1 lg:leading-tight">
                    {post?.title}
                </h1>
                <div className="flex gap-2 mt-3 items-center flex-wrap md:flex-nowrap">
                    <span className="text-gray-400">
                        Connor Lopez
                    </span>
                    <span className="text-gray-400">•</span>
                    {dayjs(post?.createdAt).format('YYYY-MM-DD')}
                </div>
            </div>
            <div className="mx-auto prose prose-lg mt-6">
                {post?.description}
            </div>
            <div className="text-center mt-8">
                <Link
                    href="/"
                    className="bg-gray-100 px-5 py-3 rounded-md hover:bg-gray-200 transition"
                >← Back to Blog</Link>
            </div>
            <div className='container'>
                <section>
                    <div className="container">
                      {comments.map((comment) => (
                        <div key={comment._id} className="flex-col w-full py-4 mx-auto mt-3 bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm md:w-2/3">
                            <div className="flex flex-row md-10">
                                <div className="flex-col mt-1">
                                <div className="flex items-center flex-1 px-4 font-bold leading-tight">
                                    {comment.name}
                                    <span className="ml-2 text-xs font-normal text-gray-500">
                                    {dayjs(comment.createdAt).format('YYYY-MM-DD')}
                                    </span>
                                </div>
                                <div className="flex-1 px-2  text-sm font-medium leading-loose text-gray-600">
                                {comment.comment}
                                </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </section>
                <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Leave a Comment</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Your email address will not be published. Required fields are marked *
                    </p>
                    <form
                        onSubmit={form.handleSubmit(onCommentFormSubmit)}
                    >
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
                                        <input {...field} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                    )}
                                />
                                {form.formState.errors.name && <p className='text-sm text-red-700'>{form.formState.errors.name.message}</p>}
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
                                        <input {...field} type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                    )}
                                />
                                {form.formState.errors.email && <p className='text-sm text-red-700'>{form.formState.errors.email.message}</p>}
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
                                    <textarea {...field} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                )}
                            />
                            {form.formState.errors.comment && <p className='text-sm text-red-700'>{form.formState.errors.comment.message}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
                        >
                            Post Comment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
