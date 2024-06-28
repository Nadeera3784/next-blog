import {Category} from "./category.interface";

export interface Post {
    _id: string;
    title: string;
    slug: string,
    description: string;
    category: Category,
    createdAt: string;
    updatedAt?: string;
}
  