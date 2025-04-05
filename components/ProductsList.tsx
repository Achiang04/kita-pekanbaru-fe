import { TQuery } from "../@types/common";
import { ListProdutData } from "../@types/newTypes/newTypes";
import { IProduct } from "../@types/product";
import ProductItem from "./productsList/ProductItem";

export default function ProductsList({
  products,
  query,
  categoryId,
}: IProductListProps) {
  return (
    <ul className="products list-unstyled">
      {products.map((product) => (
        <ProductItem
          product={product}
          key={product.id}
          query={query}
          categoryId={categoryId}
        />
      ))}
    </ul>
  );
}

interface IProductListProps {
  products: ListProdutData[];
  query: TQuery;
  categoryId?: string;
}
