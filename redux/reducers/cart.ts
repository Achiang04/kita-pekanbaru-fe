import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartTotal } from "../../@types/cart";
import { ICartProduct } from "../../@types/product";
import { IVwItem } from "../../@types/inventoryItem";
import {
  CheckoutItemType,
  ListProdutData,
} from "../../@types/newTypes/newTypes";

export interface CartState {
  cartId: string | null;
  total: ICartTotal | null;
  showVariantModal: boolean;
  variantModalData: IVariantModalData;
  showCall2Order: boolean;
  call2OrderData: ICall2OrderData;
  submitting: boolean;
  cartInited: TCartInited;
  checkoutItem: CheckoutItemType;
}

export enum TCartInited {
  "no",
  "processing",
  "yes",
}

const initialState: CartState = {
  cartId: null,
  total: null,
  showVariantModal: false,
  variantModalData: {},
  showCall2Order: false,
  call2OrderData: {},
  submitting: false,
  cartInited: TCartInited.no,
  checkoutItem: { id: "", orderItems: [], total: 0 },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartTotal: (state, action: PayloadAction<ICartTotal>) => {
      state.total = action.payload;
    },
    showVariantModal: (state, action: PayloadAction<IVariantModalData>) => {
      state.showVariantModal = true;
      state.variantModalData = action.payload;
    },
    hideVariantModal: (state) => {
      state.showVariantModal = false;
      state.variantModalData = {};
    },
    showCall2Order: (state, action: PayloadAction<ICall2OrderData>) => {
      state.showCall2Order = true;
      state.call2OrderData = action.payload;
    },
    hideCall2Order: (state) => {
      state.showCall2Order = false;
      state.call2OrderData = {};
    },
    setCartSubmitting: (state, action: PayloadAction<boolean>) => {
      state.submitting = action.payload;
    },
    setInitStatus: (state, action: PayloadAction<TCartInited>) => {
      state.cartInited = action.payload;
    },
    setCartInited: (
      state,
      action: PayloadAction<{ id: string; total: ICartTotal }>
    ) => {
      state.cartId = action.payload.id;
      state.total = action.payload.total;
      state.cartInited = TCartInited.yes;
    },
    removeCheckoutItem: (state) => {
      state.checkoutItem = { id: "", orderItems: [], total: 0 };
      localStorage.removeItem("checkout_item");
    },
    setCheckoutItem: (state, action: PayloadAction<CheckoutItemType>) => {
      state.checkoutItem = action.payload;
      localStorage.setItem("checkout_item", JSON.stringify(action.payload));
    },
  },
});

export const {
  setCartTotal,
  showVariantModal,
  hideVariantModal,
  showCall2Order,
  hideCall2Order,
  setCartSubmitting,
  setInitStatus,
  setCartInited,
  removeCheckoutItem,
  setCheckoutItem,
} = cartSlice.actions;

export default cartSlice.reducer;

export interface IVariantModalData {
  product?: ListProdutData;
}

export interface ICall2OrderData {
  qty?: number;
  item?: ListProdutData;
  price?: number;
}
