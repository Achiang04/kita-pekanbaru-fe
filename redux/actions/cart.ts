import {
  setCartInited,
  setCartSubmitting,
  setCartTotal,
  setInitStatus,
  showCall2Order,
  showVariantModal,
  TCartInited,
} from "../reducers/cart";
import { AppThunk } from "../store";
import Cookie from "js-cookie";
import { apiClient } from "../../lib/api";
import { showErrorAlert } from "../reducers/alert";
import { addedCallOrderData, selectedVariantData } from "../../dummy/data";

export const initCart = (): AppThunk => async (dispatch, getState) => {
  const { cartInited } = getState().cart;
  if ([TCartInited.yes, TCartInited.processing].includes(cartInited)) {
    return;
  }

  dispatch(setInitStatus(TCartInited.processing));
  try {
    const cartInfo = await getCartByCookieOrRetrieve();
    Cookie.set("boundless_cart_id", cartInfo.id, {
      expires: 365,
      sameSite: "None",
      secure: true,
    });

    dispatch(setCartInited(cartInfo));
  } catch (err) {
    console.error(err);
    dispatch(setInitStatus(TCartInited.no));
  }
};

export const getCartByCookieOrRetrieve = async () => {
  const cartId = Cookie.get("boundless_cart_id");
  if (cartId) {
    try {
      return await apiClient.cart.getCartInfo(cartId);
    } catch (e) {
      //
    }
  }

  return await apiClient.cart.retrieveCart();
};

export const addItem2Cart =
  (itemId: number, qty: number = 1, callToOrder: boolean = false): AppThunk =>
  async (dispatch, getState) => {
    try {
      const cartId = getState().cart.cartId;
      if (!cartId) {
        dispatch(showErrorAlert("Error loading cart"));
        return;
      }

      dispatch(setCartSubmitting(true));
      if (callToOrder) {
        // TODO: integrate add item to cart API

        // TODO: add error validation when failed to add item to cart
        // if (error) {
        //   dispatch(showErrorAlert("Error to add item to cart"));
        // }

        dispatch(showCall2Order(addedCallOrderData));
        dispatch(
          setCartTotal({
            qty,
            total: "0", // TODO: adjust total price
          })
        );
      } else {
        dispatch(showVariantModal({ product: selectedVariantData }));
      }
      dispatch(setCartSubmitting(false));
    } catch (err) {
      console.error(err);
    }
  };
