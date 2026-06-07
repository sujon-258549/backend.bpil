export declare const ContactServices: {
    submitContactForm: (payload: {
        name: string;
        email: string;
        subject: string;
        message: string;
        phone?: string;
        services?: string[];
        company?: string;
        budget?: string;
    }) => Promise<{
        message: string;
        data: {
            name: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            message: string;
            status: string;
            phone: string | null;
            services: string[];
            company: string | null;
            budget: string | null;
        };
    }>;
    getAllContacts: (query: any) => Promise<{
        data: {
            name: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            message: string;
            status: string;
            phone: string | null;
            services: string[];
            company: string | null;
            budget: string | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    updateContactStatus: (id: string, status: string) => Promise<{
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        message: string;
        status: string;
        phone: string | null;
        services: string[];
        company: string | null;
        budget: string | null;
    }>;
    deleteContact: (id: string) => Promise<{
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        message: string;
        status: string;
        phone: string | null;
        services: string[];
        company: string | null;
        budget: string | null;
    }>;
};
//# sourceMappingURL=contact.service.d.ts.map