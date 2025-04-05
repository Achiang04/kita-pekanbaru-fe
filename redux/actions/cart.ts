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
import { showErrorAlert } from "../reducers/alert";
import { addedCallOrderData, selectedVariantData } from "../../dummy/data";
import { getProductDataById } from "../../lib/apiFunction";
import { ListProdutData } from "../../@types/newTypes/newTypes";

export const initCart = (): AppThunk => async (dispatch, getState) => {
  const { cartInited } = getState().cart;
  if ([TCartInited.yes, TCartInited.processing].includes(cartInited)) {
    return;
  }

  dispatch(setInitStatus(TCartInited.processing));
  try {
    const cartInfo = await getCartByCookieOrRetrieve();
    // Cookie.set("boundless_cart_id", cartInfo.id, {
    //   expires: 365,
    //   sameSite: "None",
    //   secure: true,
    // });

    if (cartInfo) {
      dispatch(setCartInited(cartInfo));
    } else {
      throw new Error("No Item on Cart");
    }
  } catch (err) {
    console.error(err);
    dispatch(setInitStatus(TCartInited.no));
  }
};

export const getCartByCookieOrRetrieve = async () => {
  // TODO: Integrate  get user cart information

  return null;
};

export const addItem2Cart =
  (itemId: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const response = await getProductDataById(itemId);
      let product: ListProdutData | undefined;

      if (response.responseCode === "SUCCESS") {
        product = response.data;
        dispatch(showVariantModal({ product: product }));
      } else {
        dispatch(showErrorAlert("Error loading cart"));
      }

      // const cartId = getState().cart.cartId;
      // if (!cartId) {
      //   dispatch(showErrorAlert("Error loading cart"));
      //   return;
      // }
      // dispatch(setCartSubmitting(true));
      // if (callToOrder) {
      //   // TODO: integrate add item to cart API
      //   // TODO: add error validation when failed to add item to cart
      //   // if (error) {
      //   //   dispatch(showErrorAlert("Error to add item to cart"));
      //   // }
      // dispatch(showCall2Order(addedCallOrderData));
      //   dispatch(
      //     setCartTotal({
      //       qty,
      //       total: "0", // TODO: adjust total price
      //     })
      //   );
      // } else {
      //   dispatch(showVariantModal({ product: selectedVariantData }));
      // }
      // dispatch(setCartSubmitting(false));
    } catch (err) {
      console.error(err);
    }
  };
