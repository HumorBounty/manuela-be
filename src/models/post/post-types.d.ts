export interface Post {
  _id?: any;
  caption?: string;
  attachedImage?: {
    id: string;
    items: [];
  };
  status?: "PUBLISHED" | "UNPUBLISHED" | "DRAFT";
  type?: "LOOKBOOK" | "REELS";
  owner?: {
    userId: any;
  }
  createdAt?: any;
}
