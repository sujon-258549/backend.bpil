export type IGalleryFilterRequest = {
  searchTerm?: string | undefined;
  name?: string | undefined;
  isActive?: boolean | undefined;
};

export interface IGallery {
  id: string;
  branchId?: string | null;
  name: string;
  description?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
