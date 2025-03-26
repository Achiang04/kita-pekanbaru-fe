import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");
    headers.set("Accept", "application/json");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  //if error 500 then send to sentry
  if (result.error && result.error.status === 401) {
    localStorage.removeItem("token");
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["Auth", "Medias", "Cart", "Address"],
  endpoints: () => ({}),
});
