import { GetCartResponse } from "../../@types/newTypes/newTypes";
import { product } from "../../dummy/data";
import { api } from "../api";

export const cartApi = api.injectEndpoints({
  endpoints: (build) => ({
    // TODO: please update any with proper TS type
    getCartItem: build.query<GetCartResponse[], undefined>({
      query: () => ({
        url: "api/v1/carts",
        method: "GET",
      }),
      providesTags: ["Cart"],
      transformResponse: (response: any) => response.data,
    }),
    postCartItem: build.mutation<any, { productId: string; qty: number }>({
      query: (body) => {
        return {
          url: "/api/v1/carts",
          method: "POST",
          body: { productId: body.productId, qty: body.qty },
        };
      },
      invalidatesTags: ["Cart"],
    }),
    putCartItem: build.mutation<any, { cartId: string; qty: number }>({
      query: (body) => {
        return {
          url: `/api/v1/carts/${body.cartId}`,
          method: "PUT",
          body: { qty: body.qty },
        };
      },
      invalidatesTags: ["Cart"],
    }),
    removeCartItem: build.mutation<any, { cartId: string }>({
      query: (body) => {
        return {
          url: `/api/v1/carts/${body.cartId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Cart"],
    }),
    postCheckout: build.mutation<any, { cart: string[] }>({
      query: (body) => {
        return {
          url: "/api/v1/carts/checkout",
          method: "POST",
          body: { cartIDs: body.cart },
        };
      },
      invalidatesTags: ["Cart"],
      transformResponse: (response: any) => response.data,
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCartItemQuery,
  usePostCartItemMutation,
  usePutCartItemMutation,
  useRemoveCartItemMutation,
  usePostCheckoutMutation,
} = cartApi;
