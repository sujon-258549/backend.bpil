export declare const BlogServices: {
    createBlog: (payload: any, user: any) => Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        category: string[];
        slug: string | null;
        title: string | null;
        excerpt: string | null;
        tags: string[];
        isPublished: boolean;
        authorId: string | null;
        content: string | null;
        authorName: string | null;
        authorImage: string | null;
        publishedAt: Date | null;
        coverImageId: string | null;
        thumbnailId: string | null;
    }>;
    getAllBlog: (query: any, user: any) => Promise<{
        data: ({
            coverImage: {
                name: string | null;
                url: string | null;
                createdAt: Date;
                updatedAt: Date;
                id: string;
                slug: string | null;
                folderId: string | null;
                status: boolean;
                zoomFileId: number | null;
            } | null;
            thumbnail: {
                name: string | null;
                url: string | null;
                createdAt: Date;
                updatedAt: Date;
                id: string;
                slug: string | null;
                folderId: string | null;
                status: boolean;
                zoomFileId: number | null;
            } | null;
            author: {
                email: string | null;
                mobile: string | null;
                id: string;
                profile: {
                    name: string | null;
                    photo: string | null;
                    profilePhoto: {
                        name: string | null;
                        url: string | null;
                        createdAt: Date;
                        updatedAt: Date;
                        id: string;
                        slug: string | null;
                        folderId: string | null;
                        status: boolean;
                        zoomFileId: number | null;
                    } | null;
                } | null;
            } | null;
        } & {
            createdAt: Date;
            updatedAt: Date;
            id: string;
            description: string | null;
            category: string[];
            slug: string | null;
            title: string | null;
            excerpt: string | null;
            tags: string[];
            isPublished: boolean;
            authorId: string | null;
            content: string | null;
            authorName: string | null;
            authorImage: string | null;
            publishedAt: Date | null;
            coverImageId: string | null;
            thumbnailId: string | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getBlogById: (id: string, user: any) => Promise<{
        coverImage: {
            name: string | null;
            url: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            slug: string | null;
            folderId: string | null;
            status: boolean;
            zoomFileId: number | null;
        } | null;
        thumbnail: {
            name: string | null;
            url: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            slug: string | null;
            folderId: string | null;
            status: boolean;
            zoomFileId: number | null;
        } | null;
        author: {
            email: string | null;
            mobile: string | null;
            id: string;
            profile: {
                name: string | null;
                photo: string | null;
                profilePhoto: {
                    name: string | null;
                    url: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    id: string;
                    slug: string | null;
                    folderId: string | null;
                    status: boolean;
                    zoomFileId: number | null;
                } | null;
            } | null;
        } | null;
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        category: string[];
        slug: string | null;
        title: string | null;
        excerpt: string | null;
        tags: string[];
        isPublished: boolean;
        authorId: string | null;
        content: string | null;
        authorName: string | null;
        authorImage: string | null;
        publishedAt: Date | null;
        coverImageId: string | null;
        thumbnailId: string | null;
    }>;
    updateBlog: (id: string, payload: any, user: any) => Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        category: string[];
        slug: string | null;
        title: string | null;
        excerpt: string | null;
        tags: string[];
        isPublished: boolean;
        authorId: string | null;
        content: string | null;
        authorName: string | null;
        authorImage: string | null;
        publishedAt: Date | null;
        coverImageId: string | null;
        thumbnailId: string | null;
    }>;
    deleteBlog: (id: string, user: any) => Promise<{
        message: string;
    }>;
    updateBlogStatus: (id: string, user: any) => Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        description: string | null;
        category: string[];
        slug: string | null;
        title: string | null;
        excerpt: string | null;
        tags: string[];
        isPublished: boolean;
        authorId: string | null;
        content: string | null;
        authorName: string | null;
        authorImage: string | null;
        publishedAt: Date | null;
        coverImageId: string | null;
        thumbnailId: string | null;
    }>;
};
//# sourceMappingURL=blog.service.d.ts.map