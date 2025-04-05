import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../redux/store";
import debounce from "lodash/debounce";
import CartRow from "./CartRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/faShoppingCart";
import { useRouter } from "next/router";
import { ICartItem } from "../../@types/cart";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  CheckoutItemType,
  GetCartResponse,
} from "../../@types/newTypes/newTypes";
import { Checkbox } from "@mui/material";
import useFormatCurrency from "../../hooks/useFormatCurrency";
import { usePostCheckoutMutation } from "../../services/cart";
import { setCheckoutItem } from "../../redux/reducers/cart";

export default function CartItems({ items, setItems, total }: ICartItemsProps) {
  const dispatch = useAppDispatch();
  const submits = useRef<Promise<any>[]>([]);
  const mounted = useRef(false);
  const cartId = useAppSelector((state: RootState) => state.cart);
  const [submitting, setSubmitting] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    { id: string; qty: number; total: number }[]
  >([]);
  const { formatRupiah } = useFormatCurrency();
  const [checkoutMutation] = usePostCheckoutMutation();
  const router = useRouter();

  const checkBgSubmits = () => {
    const size = submits.current.length;
    if (!size || !mounted.current) return;

    setSubmitting(true);
    Promise.allSettled(submits.current).then(() => {
      if (submits.current.length === size) {
        setSubmitting(false);
        submits.current = [];
      }
    });
  };

  const rmItem = (itemId: string) => {
    if (!cartId) return;
    if (!confirm("Are you sure?")) return;

    // TODO: integrate delete cart API
    // TODO: add error validation when failed to delete item from cart
    // if (error) {
    //   dispatch(showErrorAlert("Error to delete item from cart"));
    // }

    // setItems((prevItems) => prevItems.filter((el) => el.item_id !== itemId));
  };

  const submitQty = async (itemId: number, newQty: number) => {
    if (!cartId) return;

    // TODO: integrate change cart item quantity  API
  };

  const debouncedSubmitQty = useMemo(
    () =>
      debounce((itemId: number, qty: number) => submitQty(itemId, qty), 700, {
        leading: true,
      }),
    []
  ); // eslint-disable-line

  const onQtyChange = (itemId: string, newQty: number) => {
    setSubmitting(true);
    // debouncedSubmitQty(itemId, newQty);

    // setItems((prevFiltered) => {
    //   const out = [...prevFiltered];
    //   const index = out.findIndex((el) => el.item_id === itemId);
    //   if (index >= 0) {
    //     out[index].qty = newQty;
    //   }
    //   return out;
    // });
  };

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <>
      <div className="cart-items">
        <div className="cart-items__thead row">
          <div className="cart-items__thead-cell col-md-4"></div>
          <div className="cart-items__thead-cell col-md-2">Price</div>
          <div className="cart-items__thead-cell col-md-2">Qty</div>
          <div className="cart-items__thead-cell col-md-2">Total</div>
          <div className="cart-items__thead-cell col-md-2"></div>
        </div>
        {items.map((item) => (
          <CartRow
            item={item}
            key={item.id}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ))}
        <div className="cart-items__total-row row">
          <div className="cart-items__total-cell cart-items__total-cell_title col-md-6">
            Order Total:
          </div>
          <div className="cart-items__total-cell col-md-2">
            <span className="cart-items__label">Qty: </span>
            {selectedItem.reduce((sum, item) => sum + item.qty, 0)}
          </div>
          <div className="cart-items__total-cell col-md-2">
            <span className="cart-items__label">Price: </span>
            {formatRupiah(
              selectedItem.reduce((sum, item) => sum + item.total, 0)
            )}
          </div>
        </div>
      </div>
      <div className="cart-items__actions">
        <button
          className="btn btn-action btn-lg btn-anim"
          disabled={selectedItem.length === 0}
          onClick={async () => {
            const result = await checkoutMutation({
              cart: selectedItem.map((val) => val.id),
            });
            if ("error" in result) {
              // TODO: handle error
            } else {
              // TODO: handle success
              const data = result.data;

              const checkoutData: CheckoutItemType = {
                id: data.id,
                orderItems: data.orderItems,
                total: data.total,
                cartId: data.cartIDs,
              };

              await dispatch(setCheckoutItem(checkoutData));

              router.push("/checkout/shipping-address");
            }
          }}
        >
          Proceed to checkout{" "}
          <FontAwesomeIcon icon={faShoppingCart as IconProp} />
        </button>
      </div>
    </>
  );
}

interface ICartItemsProps {
  items: GetCartResponse[];
  setItems: Dispatch<SetStateAction<GetCartResponse[]>>;
  total: { qty: number; price: string };
}
