import { useCallback, useEffect, useMemo, useState } from "react";
import CartItems from "../components/cart/CartItems";
import { useAppDispatch } from "../hooks/redux";
import MainLayout from "../layouts/Main";
import { setCartTotal, TCartInited } from "../redux/reducers/cart";
import { useCart } from "../hooks/cart";
import { makeAllMenus } from "../lib/menu";
import { IMenuItem } from "../@types/components";
import { GetServerSideProps } from "next";
import CartLoader from "../components/cart/CartLoader";
import Link from "next/link";
import { calcTotal, calcTotalPrice } from "../lib/calculator";
import { useRouter } from "next/router";
import { IBasicSettings } from "../@types/settings";
import { ICartItem } from "../@types/cart";
import {
  basicSettings,
  cartData,
  cartTotalData,
  categoryTree,
} from "../dummy/data";
import ProtectedLayout from "../layouts/ProtectedLayout";
import { Category, GetCartResponse } from "../@types/newTypes/newTypes";
import { useGetCartItemQuery } from "../services/cart";

export default function CartPage({
  mainMenu,
  footerMenu,
  basicSettings,
}: ICartPageProps) {
  const { cartInited } = useCart();
  const router = useRouter();
  const { loading, total } = useCartItems();
  const [items, setItems] = useState<GetCartResponse[]>([]);
  const { data, isLoading } = useGetCartItemQuery(undefined);

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  return (
    <ProtectedLayout>
      <MainLayout
        mainMenu={mainMenu}
        footerMenu={footerMenu}
        basicSettings={basicSettings}
        noIndex
      >
        <div className="container">
          <div className="cart-page row">
            <div className="col-lg-8 offset-lg-2">
              {router.query.error && (
                <div className={"alert alert-danger"} role={"alert"}>
                  {router.query.error}
                </div>
              )}
              <h1 className="page-heading page-heading_h1  page-heading_m-h1">
                Shopping cart
              </h1>
              <div className="cart-page__content">
                {isLoading ? (
                  <CartLoader />
                ) : items && items.length > 0 ? (
                  <CartItems items={items} setItems={setItems} total={total} />
                ) : (
                  <>
                    <p className="cart-page__warning">
                      Your shopping cart is empty.
                    </p>
                    <p className="cart-page__warning">
                      <Link href="/" className="btn btn-success">
                        Go shopping!
                      </Link>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedLayout>
  );
}

export const getServerSideProps: GetServerSideProps<
  ICartPageProps
> = async () => {
  const { mainMenu, footerMenu } = await makeAllMenus({ categoryTree });

  return {
    props: {
      mainMenu,
      footerMenu,
      basicSettings,
    },
  };
};

interface ICartPageProps {
  mainMenu: Category[];
  footerMenu: IMenuItem[];
  basicSettings: IBasicSettings;
}

const useCartItems = () => {
  const dispatch = useAppDispatch();
  const { id: cartId } = useCart();
  const [items, setItems] = useState<ICartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const initCartData = useCallback(
    (cartId: string) => {
      setLoading(true);
      setItems(cartData);
      dispatch(setCartTotal(cartTotalData.total));
      setLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    if (cartId) {
      initCartData(cartId);
    }
  }, [cartId, initCartData]);

  const total = useMemo(
    () =>
      calcTotal(
        items.map((el) => ({
          qty: el.qty,
          price: calcTotalPrice(el.itemPrice.final_price!, el.qty),
        }))
      ),
    [items]
  );

  useEffect(() => {
    dispatch(
      setCartTotal({
        qty: total.qty,
        total: total.price,
      })
    );
  }, [total, dispatch]);

  return {
    items,
    setItems,
    loading,
    total,
  };
};
