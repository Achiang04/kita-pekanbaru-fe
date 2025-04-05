import clsx from "clsx";
import { useAppDispatch } from "../../hooks/redux";
import { addItem2Cart } from "../../redux/actions/cart";
import { getProductUrl } from "../../lib/urls";
import ProductListImage from "./ProductImage";
import ProductPrice from "./ProductPrice";
import { TQuery } from "../../@types/common";
import Link from "next/link";
import ProductLabels from "../product/Labels";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons/faCartPlus";
import NoImage from "../NoImage";
import { findSellingPrice } from "../../lib/product";
import { IProduct } from "../../@types/product";
import { TThumbRatio } from "../../@types/image";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/navigation";
import { ListProdutData } from "../../@types/newTypes/newTypes";
import { IImagePartial } from "../../lib/imgs";

export default function ProductItem({
  product,
  query,
  categoryId,
}: IProductItemProps) {
  const params = { ...query };
  // if (categoryId && categoryId !== product.default_category?.category_id) {
  //   Object.assign(params, { category: categoryId });
  // }
  // const productUrl = getProductUrl(product, params);
  // const sellingPrice = findSellingPrice(product.prices);

  return (
    <li
      className={clsx("products__item", {
        "in-stock": true,
        // "out-of-stock": !product.in_stock,
      })}
      data-id={product.id}
      itemScope
      itemType="//schema.org/Product"
    >
      <div className="products__item-wrapper">
        <ProductImage
          product={product}
          productUrl={product.medias[0].fileUrl}
        />
        <h4 className="products__title">
          <Link href={`/product/${product.id}`} itemProp="url">
            <span itemProp="name">{product.name}</span>
          </Link>
        </h4>
        <div className="products__offer">
          <ProductPrice price={product.priceLists[0]} />
        </div>
        <Product2Cart product={product} />
      </div>
      <ProductSchemaOrgMarkup product={product} />
    </li>
  );
}

function Product2Cart({ product }: { product: ListProdutData }) {
  const { isLogin } = useSelector((state: RootState) => state.userAuth);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onAddToCart = () => {
    if (isLogin) {
      dispatch(addItem2Cart(product.id));
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="products__to-cart">
      {/* {product.in_stock ? ( */}
      <button
        type="button"
        className="btn btn-action btn-resp-size"
        onClick={onAddToCart}
      >
        <FontAwesomeIcon icon={faCartPlus as IconProp} /> Add to cart
      </button>
      {/* ) : (
        <span className={"text-muted"}>Out of stock</span>
      )} */}
    </div>
  );
}

function ProductImage({
  product,
  productUrl,
}: {
  product: ListProdutData;
  productUrl: string;
}) {
  const img: IImagePartial = { path: productUrl };

  return (
    <Link href={`/product/${product.id}`} className={"products__image"}>
      <ProductListImage image={img} alt={product.name} />

      {/* <ProductLabels
        labels={product.name}
        className={"product__labels_small product__labels_column"}
      /> */}
    </Link>
  );
}

function ProductSchemaOrgMarkup({ product }: { product: ListProdutData }) {
  const schemaAvailability = "//schema.org/InStock";

  // const sellingPrice = findSellingPrice(product.prices);

  return (
    <>
      <meta itemProp="productID" content={String(product.id)} />
      <meta itemProp="brand" content={product.name || ""} />

      <div itemProp="offers" itemScope itemType="//schema.org/AggregateOffer">
        <meta itemProp="price" content={String(product.priceLists[0].price)} />
        {/* <meta itemProp="highPrice" content={String(sellingPrice.max)} /> */}
        <meta itemProp="priceCurrency" content="rupiah" />
        <link itemProp="availability" href={schemaAvailability} />
      </div>
    </>
  );
}

interface IProductItemProps {
  product: ListProdutData;
  query: TQuery;
  categoryId?: string;
}
