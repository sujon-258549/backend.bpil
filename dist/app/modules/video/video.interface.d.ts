export type IVideoFilterRequest = {
    searchTerm?: string | undefined;
    name?: string | undefined;
    isActive?: boolean | undefined;
};
export interface IVideo {
    id: string;
    branchId?: string | null;
    name: string;
    description?: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=video.interface.d.ts.map