import type { ActorContext } from "../../utils/tenant.ts";
export declare const BlogServices: {
    createBlog: (payload: any, actor: ActorContext) => Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        category: string[];
        description: string | null;
        slug: string | null;
        title: string | null;
        excerpt: string | null;
        authorName: string | null;
        tags: string[];
        isPublished: boolean;
        authorId: string | null;
        content: string | null;
        coverImage: string | null;
        authorImage: string | null;
        publishedAt: Date | null;
    }>;
    getAllBlog: (query: any, actor: ActorContext) => Promise<{
        data: {
            createdAt: Date;
            updatedAt: Date;
            id: string;
            category: string[];
            description: string | null;
            slug: string | null;
            title: string | null;
            excerpt: string | null;
            authorName: string | null;
            tags: string[];
            isPublished: boolean;
            authorId: string | null;
            content: string | null;
            coverImage: string | null;
            authorImage: string | null;
            publishedAt: Date | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getBlogById: (id: string, actor: ActorContext) => Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        category: string[];
        description: string | null;
        slug: string | null;
        title: string | null;
        excerpt: string | null;
        authorName: string | null;
        tags: string[];
        isPublished: boolean;
        authorId: string | null;
        content: string | null;
        coverImage: string | null;
        authorImage: string | null;
        publishedAt: Date | null;
    }>;
    updateBlog: (id: string, payload: any, actor: ActorContext) => Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        category: string[];
        description: string | null;
        slug: string | null;
        title: string | null;
        excerpt: string | null;
        authorName: string | null;
        tags: string[];
        isPublished: boolean;
        authorId: string | null;
        content: string | null;
        coverImage: string | null;
        authorImage: string | null;
        publishedAt: Date | null;
    }>;
    deleteBlog: (id: string, actor: ActorContext) => Promise<{
        message: string;
    }>;
    updateBlogStatus: (id: string, actor: ActorContext) => Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        category: string[];
        description: string | null;
        slug: string | null;
        title: string | null;
        excerpt: string | null;
        authorName: string | null;
        tags: string[];
        isPublished: boolean;
        authorId: string | null;
        content: string | null;
        coverImage: string | null;
        authorImage: string | null;
        publishedAt: Date | null;
    }>;
};
//# sourceMappingURL=blog.service.d.ts.map