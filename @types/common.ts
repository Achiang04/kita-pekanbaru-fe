export enum TPublishingStatus {
  published = "published",
  draft = "draft",
}

// export type TPublishingStatus = "published" | "draft";

export type TQuery = {
  [key: string]: any;
};

export enum TSortOrder {
  asc = "",
  desc = "-",
}

export interface IPagination {
  totalCount: number;
  pageCount: number;
  currentPage: number;
  perPage: number;
}
