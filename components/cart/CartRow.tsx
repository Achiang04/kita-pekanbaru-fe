import Link from "next/link";
import { getProductUrl } from "../../lib/urls";
import NoImage from "../NoImage";
import { calcTotalPrice } from "../../lib/calculator";
import useFormatCurrency from "../../hooks/useFormatCurrency";
import { TThumbRatio } from "../../@types/image";
import { ICartItem } from "../../@types/cart";
import { GetCartResponse } from "../../@types/newTypes/newTypes";
import { useEffect, useMemo, useState } from "react";
import {
  usePutCartItemMutation,
  useRemoveCartItemMutation,
} from "../../services/cart";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { showErrorAlert } from "../../redux/reducers/alert";
import { Box, Button, Checkbox, Modal, Stack, Typography } from "@mui/material";
import { Dispatch } from "@reduxjs/toolkit";

export default function CartRow({
  item,
  selectedItem,
  setSelectedItem,
}: ICartRowProps) {
  const [itemData, setItemData] = useState<GetCartResponse>(item);
  const [removeModal, setRemoveModal] = useState(false);
  const { formatRupiah } = useFormatCurrency();

  const [putCartItemMutation, { error }] = usePutCartItemMutation();
  const [removeCartItemMutation] = useRemoveCartItemMutation();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setItemData(item);
  }, [item]);

  const { price } = useMemo(() => {
    let price;

    if (itemData) {
      const priceList = [...itemData.product.priceLists].sort(
        (a, b) => b.minQty - a.minQty
      );

      for (const element of priceList) {
        if (itemData.qty >= element.minQty) {
          price = element.price;
          break;
        }
      }
    }

    return { price };
  }, [itemData]);

  const updateItem = async (qty: number) => {
    if (qty === 0) {
      setRemoveModal(true);
    } else {
      const result = await putCartItemMutation({
        cartId: itemData.id,
        qty,
      });
      if ("error" in result) {
        dispatch(showErrorAlert("Error to update cart item"));
      } else {
        setItemData({ ...itemData, qty });
        setSelectedItem((prev) => {
          return prev.map((val) => {
            if (val.id === itemData.id) {
              return {
                ...val,
                qty: qty,
                total: price! * qty,
              };
            } else {
              return val;
            }
          });
        });
      }
    }
  };

  const removeItem = async () => {
    const result = await removeCartItemMutation({ cartId: itemData.id });
    if ("error" in result) {
      dispatch(showErrorAlert("Error to remove item from cart"));
    } else {
      setSelectedItem((prev) => {
        const arrayWithDeletedValue = [...prev].filter(
          (value) => value.id !== item.id
        );
        return arrayWithDeletedValue;
      });
      setRemoveModal(false);
    }
  };

  return (
    <>
      <div className="cart-item row">
        <div className="cart-item__description-col col-md-4">
          <Checkbox
            value={item.id}
            onChange={(e) => {
              if (selectedItem.some((e) => e.id === item.id)) {
                setSelectedItem((prev) => {
                  const arrayWithDeletedValue = [...prev].filter(
                    (value) => value.id !== e.target.value
                  );
                  return arrayWithDeletedValue;
                });
              } else {
                setSelectedItem([
                  ...selectedItem,
                  {
                    id: item.id,
                    qty: itemData.qty,
                    total: price ? price * itemData.qty : 0,
                  },
                ]);
              }
            }}
            checked={selectedItem.some((e) => e.id === item.id)}
          />
          <Link
            href={`/product/${itemData.product.id}`}
            className="cart-item__img-link"
          >
            <img
              src={item.product.medias[0].fileUrl}
              width={60}
              height={60}
              alt={item.product.name}
            />
            {/* <NoImage ratio={TThumbRatio["1-1"]} className={"bg-xs"} /> */}
          </Link>
          <div className="cart-item__title">
            <div>
              <Link href={`/product/${itemData.product.id}`} legacyBehavior>
                {itemData.product.name}
              </Link>
            </div>
            {/* {item.vwItem.type === "variant" && (
            <div className="text-muted">
              {item.vwItem?.variant?.title || ""}
            </div>
          )} */}
          </div>
        </div>
        <div className="cart-item__col col-md-2">
          <span className="cart-items__label">
            <strong>Price: </strong>
          </span>
          {price && formatRupiah(price)}
        </div>
        <div className="cart-item__col cart-item__col_qty col-md-2">
          <span className="cart-items__label">
            <strong>Qty: </strong>
          </span>

          <div className="cart-item__qty-input input-group input-group-sm">
            <button
              className="btn btn-outline-secondary text-center"
              type="button"
              style={{ width: 25 }}
              disabled={itemData.qty < 1}
              onClick={() => {
                updateItem(itemData.qty - 1);
              }}
            >
              <>&ndash;</>
            </button>
            <input
              type="number"
              className="form-control form-control-sm text-center"
              name={`qty[${itemData.id}]`}
              value={itemData.qty}
              min={0}
              onChange={(e) => {
                updateItem(Number(e.target.value));
              }}
            />
            <button
              className="btn btn-outline-secondary text-center"
              type="button"
              style={{ width: 25 }}
              onClick={() => {
                updateItem(itemData.qty + 1);
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="cart-item__col col-md-2">
          <span className="cart-items__label">
            <strong>Total: </strong>
          </span>
          {price && formatRupiah(price * itemData.qty)}
        </div>
        <div className="cart-item__col cart-item__col_rm col-md-2">
          <div className="flex-col gap-2">
            <button
              className="btn btn-sm btn-outline-danger mb-2"
              onClick={removeItem}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={removeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h3">
            Do you want to remove "{item.product.name}" Product?
          </Typography>
          <Stack
            direction="row"
            gap="16px"
            justifyContent="end"
            sx={{ marginTop: "16px" }}
          >
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => setRemoveModal(false)}
            >
              No
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => removeItem()}
            >
              Yes
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

interface ICartRowProps {
  item: GetCartResponse;
  selectedItem: { id: string; qty: number; total: number }[];
  setSelectedItem: React.Dispatch<
    React.SetStateAction<{ id: string; qty: number; total: number }[]>
  >;
}
