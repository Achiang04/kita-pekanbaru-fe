import { api } from "../api";

export const mediasApi = api.injectEndpoints({
  endpoints: (build) => ({
    // TODO: please update any with proper TS type
    getNotifications: build.query<any, undefined>({
      query: () => ({
        url: "api/v1/medias",
        method: "GET",
      }),
      providesTags: ["Medias"],
      transformResponse: (response: any) => response.data,
    }),
  }),
  overrideExisting: true,
});

export const { useGetNotificationsQuery } = mediasApi;
