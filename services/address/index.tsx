import {
  AddressGetData,
  AddressPostData,
  GetCartResponse,
} from "../../@types/newTypes/newTypes";
import { product } from "../../dummy/data";
import { api } from "../api";

export type Address = { id: string; name: string };

export const cartApi = api.injectEndpoints({
  endpoints: (build) => ({
    // TODO: please update any with proper TS type
    getShippingAddress: build.query<AddressGetData[], undefined>({
      query: () => ({
        url: "api/v1/shipping_addresses",
        method: "GET",
      }),
      providesTags: ["Address"],
      transformResponse: (response: any) => response.data,
    }),
    getProvinces: build.query<Address[], undefined>({
      query: () => ({
        url: "api/v1/provinces",
        method: "GET",
      }),
      //   providesTags: ["Address"],
      transformResponse: (response: any) => response.data,
    }),
    getRegencies: build.query<Address[], { provinces: string }>({
      query: (body) => ({
        url: `api/v1/regencies?provinceId=${body.provinces}`,
        method: "GET",
      }),
      //   providesTags: ["Address"],
      transformResponse: (response: any) => response.data,
    }),
    getDistricts: build.query<Address[], { regency: string }>({
      query: (body) => ({
        url: `api/v1/districts?regencyId=${body.regency}`,
        method: "GET",
      }),
      //   providesTags: ["Address"],
      transformResponse: (response: any) => response.data,
    }),
    getSubDistricts: build.query<Address[], { district: string }>({
      query: (body) => ({
        url: `api/v1/sub-districts?districtId=${body.district}`,
        method: "GET",
      }),
      //   providesTags: ["Address"],
      transformResponse: (response: any) => response.data,
    }),
    postAddress: build.mutation<any, { data: AddressPostData }>({
      query: (body) => {
        return {
          url: "/api/v1/shipping_addresses",
          method: "POST",
          body: body.data,
        };
      },
      invalidatesTags: ["Address"],
    }),
    putAddress: build.mutation<any, { data: AddressPostData; id: string }>({
      query: (body) => {
        return {
          url: `/api/v1/shipping_addresses/${body.id}`,
          method: "PUT",
          body: body.data,
        };
      },
      invalidatesTags: ["Address"],
    }),
    deleteAddress: build.mutation<any, { id: string }>({
      query: (body) => {
        return {
          url: `/api/v1/shipping_addresses/${body.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Address"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetShippingAddressQuery,
  usePostAddressMutation,
  useGetDistrictsQuery,
  useGetProvincesQuery,
  useGetRegenciesQuery,
  useGetSubDistrictsQuery,
  usePutAddressMutation,
  useDeleteAddressMutation,
} = cartApi;
