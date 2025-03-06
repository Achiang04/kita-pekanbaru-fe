import { api } from "../api";

export type LoginResponse = {
  token: string;
};

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, { phoneNumber: string }>({
      query: (body) => {
        return {
          url: "/api/v1/auth/login",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Auth"],
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation } = authApi;
