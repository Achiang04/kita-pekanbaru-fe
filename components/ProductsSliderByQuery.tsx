import { useEffect, useState } from "react";
import ProductsSlider from "./ProductsSlider";
import { IGetProductsParams } from "../@types/catalog";
import { IProduct } from "../@types/product";
import { products as dummyData } from "../dummy/data";

export default function ProductsSliderByQuery({
  query,
  title,
  className,
  wrapperClassName,
}: ProductsSliderByQueryProps) {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: fetch get product carousel API
    setProducts(dummyData);
  }, [query]);

  if (products && !loading && !products.length) return null;

  return (
    <div className={wrapperClassName || ""}>
      {title && <h2 className="products-slider__by-query-title">{title}</h2>}
      <ProductsSlider
        className={className}
        loading={loading}
        products={products}
      />
    </div>
  );
}

interface ProductsSliderByQueryProps {
  title?: string;
  className?: string;
  wrapperClassName?: string;
  query: IGetProductsParams;
}
