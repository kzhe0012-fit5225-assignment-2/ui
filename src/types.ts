// ─── Request ─────────────────────────────────────────────────────────────────

export interface Req {}

export interface UploadImageRequest extends Req {
  /**
   * Base-64 encoded image.
   */
  image: string;
  format: string;
}

export interface GetImageInfoRequest extends Req {
  url: string;
}

export type ImageTag = {
  tag: string;
  count?: number;
};

export interface ListAllImagesRequest extends Req {}

export interface FindImageByTagsRequest extends Req {
  tags: ImageTag[];
}

export interface FindImageByImageRequest extends Req {
  /**
   * Base-64 encoded image.
   */
  image: string;
}

export interface EditTagsRequest extends Req {
  action: "add" | "remove";
  url: string;
  tags: ImageTag[];
}

export interface DeleteImageRequest extends Req {
  url: string;
}

// ─── Response ────────────────────────────────────────────────────────────────

export interface Res {}

export type Image = {
  url: string;
  tags: ImageTag[];
  author: string;
};

export interface ImageResponse extends Res {
  result: Image;
}

export interface ImageListResponse extends Res {
  results: Image[];
}

export interface SuccessStateResponse extends Res {
  result: "success" | "error";
}

// ─── Queries ─────────────────────────────────────────────────────────────────

export type Query<T extends Req, U extends Res> = { req: T; res: U };

export type ListAllImagesQuery = Query<ListAllImagesRequest, ImageListResponse>;

export type UploadImageQuery = Query<UploadImageRequest, ImageResponse>;

export type GetImageInfoQuery = Query<GetImageInfoRequest, ImageResponse>;

export type EditTagsQuery = Query<EditTagsRequest, ImageResponse>;

export type FindImageByTagsQuery = Query<
  FindImageByTagsRequest,
  ImageListResponse
>;

export type FindImageByImageQuery = Query<
  FindImageByImageRequest,
  ImageListResponse
>;

export type DeleteImageQuery = Query<DeleteImageRequest, SuccessStateResponse>;
