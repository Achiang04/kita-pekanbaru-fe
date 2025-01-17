import { IPagination } from "../@types/common";

export function extractPaginationFromHeaders(headers: {
  [key: string]: string;
}): IPagination {
  const parsedHeaders = {};
  for (const [key, value] of Object.entries(headers)) {
    //@ts-ignore
    parsedHeaders[key.toLowerCase()] = value;
  }

  const headers2Keys = {
    "x-pagination-total-count": "totalCount",
    "x-pagination-page-count": "pageCount",
    "x-pagination-current-page": "currentPage",
    "x-pagination-per-page": "perPage",
  };

  const pagination: Partial<IPagination> = {};

  for (const [header, key] of Object.entries(headers2Keys)) {
    if (header in parsedHeaders) {
      //@ts-ignore
      pagination[key] = parseInt(parsedHeaders[header]);
    }
  }

  return pagination as IPagination;
}
