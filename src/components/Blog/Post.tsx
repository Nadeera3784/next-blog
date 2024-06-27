import Link from 'next/link'
import dayjs from 'dayjs';
import { truncate } from '@/utils/text'

interface BlogProps {
    _id: string;
    title: string;
    slug: string
    description: string;
    createdAt: string;
  }

const Post: React.FC<BlogProps> = ({ _id, title, slug, description, createdAt }) => {
    return (
        <article className="flex max-w-xl flex-col items-start justify-between">
            <div className="flex items-center gap-x-4 text-xs">
                <time dateTime="2020-02-12" className="text-gray-500">
                {dayjs(createdAt).format('YYYY-MM-DD')}
                </time>
                <a
                    href="#"
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                    Business
                </a>
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/post/${slug}`}>
                        <span className="absolute inset-0" />
                        {title}
                    </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  { truncate(description, 100)}
                </p>
            </div>
        </article>
    );
}

export default Post;
