import { useState, useMemo, ChangeEvent, MouseEvent, useEffect } from "react";
import clsx from "clsx";
import { useAppDispatch } from "../../hooks/redux";
import { addItem2Cart } from "../../redux/actions/cart";
import {
  findSellingPrice,
  getPriceForTpl,
  IPriceForTpl,
} from "../../lib/product";
import currency from "currency.js";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons/faCartPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFormatCurrency from "../../hooks/useFormatCurrency";
import { IProductItem } from "../../@types/product";
import { IVariant } from "../../@types/variant";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/navigation";
import { ListPrice, ListProdutData } from "../../@types/newTypes/newTypes";
import { usePostCartItemMutation } from "../../services/cart";
import { hideVariantModal, showCall2Order } from "../../redux/reducers/cart";
import { showErrorAlert } from "../../redux/reducers/alert";

export default function ProductPriceAndBuy({
  product,
  selectedVariant,
  setError,
  onAddedToCart,
}: IPriceAndBuyProps) {
  const dispatch = useAppDispatch();
  const [qty, setQty] = useState<number>(1);
  const [priceList, setPriceList] = useState<ListPrice[]>([]);
  const { formatCurrency, formatRupiah } = useFormatCurrency();
  const { isLogin } = useSelector((state: RootState) => state.userAuth);
  const router = useRouter();

  const [mutation] = usePostCartItemMutation();

  useEffect(() => {
    setPriceList(() => {
      const oldList = [...product.priceLists].sort(
        (a, b) => b.minQty - a.minQty
      );

      return oldList;
    });
  }, [product]);

  const { benefit, isInStock } = useMemo(() => {
    let price: IPriceForTpl | undefined,
      benefit: number | null = null;
    if (selectedVariant) {
      const sellingPrice = findSellingPrice(selectedVariant.prices);
      if (sellingPrice) {
        price = { price: sellingPrice.value, oldPrice: sellingPrice.old };
      }
    } else {
      // const sellingPrice = findSellingPrice(product.prices);
      // if (sellingPrice) {
      //   price = getPriceForTpl(sellingPrice);
      // }
    }

    if (price && price.price && price.oldPrice) {
      benefit = new currency(price.oldPrice).subtract(price.price).toJSON();
    }

    // const isInStock = selectedVariant
    //   ? selectedVariant.in_stock
    //   : product.in_stock;
    const isInStock = true;

    return { price, benefit, isInStock };
  }, [product, selectedVariant]);

  const { price } = useMemo(() => {
    let price;

    for (const element of priceList) {
      if (qty >= element.minQty) {
        price = element.price;
        break;
      }
    }

    return { price };
  }, [qty, priceList, product]);

  const onBuyBtnClicked = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // if (product.has_variants && !selectedVariant) {
    //   setError("Please, choose a variant.");
    //   return;
    // }

    if (isLogin) {
      const result = await mutation({
        productId: product.id,
        qty,
      });
      if ("error" in result) {
        dispatch(showErrorAlert("Error loading cart"));
      } else {
        dispatch(hideVariantModal());
        dispatch(showCall2Order({ item: product, qty: qty, price: price }));
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="price-and-buy">
      {/* {price?.price && (
        <p className={"price-and-buy__price"}>
          {price.isFrom && <span className={"price-and-buy__from"}>From:</span>}
          <span
            className={clsx("price-and-buy__current", {
              "has-old": price.oldPrice,
            })}
          >
            {formatCurrency(price.price)}
          </span>
          {price.oldPrice && (
            <span className={"price-and-buy__old"}>
              {formatCurrency(price.oldPrice)}
            </span>
          )}
        </p>
      )} */}
      <p
        className={"price-and-buy__price"}
        style={{ marginBottom: price && "0" }}
      >
        <span
          className={clsx("price-and-buy__current", {
            "has-old": false,
          })}
        >
          {price
            ? `${formatRupiah(price)} Each`
            : `Minimal Order: ${
                priceList.length > 0
                  ? priceList[priceList.length - 1].minQty
                  : 0
              }`}
        </span>
      </p>
      {price && (
        <p className={"price-and-buy__price"}>
          <span
            className={clsx("price-and-buy__current", {
              "has-old": true,
            })}
          >
            {`Total: ${formatRupiah(price * qty)}`}
          </span>
        </p>
      )}
      {/* {benefit && (
        <p className={"price-and-buy__benefit"}>
          <label className={"price-and-buy__benefit-label"}>You save:</label>
          <span className={"price-and-buy__benefit-value"}>
            {formatCurrency(benefit)}
          </span>
        </p>
      )} */}
      {/* {(!product.has_variants || selectedVariant) && (
        <>
          <p
            className={clsx("price-and-buy__stock", {
              in: isInStock,
              out: !isInStock,
            })}
          >
            {isInStock && "In stock"}
            {!isInStock && "Out of stock"}
          </p>
          {(product.sku || selectedVariant?.sku) && (
            <p>
              SKU:{" "}
              <span className="text-muted">
                {selectedVariant?.sku || product.sku}
              </span>
            </p>
          )}
        </>
      )} */}
      <p
        className={clsx("price-and-buy__stock", {
          in: product.stock > 0,
          out: product.stock === 0,
        })}
      >
        {product.stock > 0 && `In stock: ${product.stock}`}
        {product.stock === 0 && "Out of stock"}
      </p>

      <div className={"price-and-buy__2-cart"}>
        <PriceAndBuyQty qty={qty} setQty={setQty} />
        <div className={"price-and-buy__btns"}>
          <button
            type={"button"}
            className={"btn btn-action btn-anim btn-lg"}
            onClick={onBuyBtnClicked}
            disabled={!price || product.stock === 0 || qty > product.stock}
          >
            <FontAwesomeIcon icon={faCartPlus as IconProp} /> Buy
          </button>
        </div>
      </div>
    </div>
  );
}

interface IPriceAndBuyProps {
  product: ListProdutData;
  selectedVariant?: IVariant | null;
  setError: (error: null | string) => void;
  onAddedToCart?: (itemId: number, qty: number) => void;
}

const PriceAndBuyQty = ({
  qty,
  setQty,
}: {
  qty: number;
  setQty: (value: number) => void;
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQty(parseInt(e.target.value) || 1);
  const onBtnClicked = (diff: number, e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let newQty = qty + diff;
    if (newQty < 1) {
      newQty = 1;
    }

    setQty(newQty);
  };

  return (
    <div className={"price-and-buy__qty input-group"}>
      <button
        type={"button"}
        className={"btn btn-outline-secondary text-center"}
        onClick={onBtnClicked.bind(null, -1)}
      >
        <FontAwesomeIcon icon={faMinus as IconProp} />
      </button>
      <input
        type={"number"}
        className={"form-control"}
        value={qty}
        min={1}
        onChange={onChange}
      />
      <button
        type={"button"}
        className={"btn btn-outline-secondary text-center"}
        onClick={onBtnClicked.bind(null, 1)}
      >
        <FontAwesomeIcon icon={faPlus as IconProp} />
      </button>
    </div>
  );
};
