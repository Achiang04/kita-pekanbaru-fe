import { api } from "../api";

export const mediasApi = api.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<any, undefined>({
      query: () => ({
        url: "api/v1/medias",
        method: "GET",
      }),
      providesTags: ["Medias"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetNotificationsQuery } = mediasApi;
