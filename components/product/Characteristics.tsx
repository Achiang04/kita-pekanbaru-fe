import React from "react";
import CharacteristicItem from "./characteristics/CharacteristicItem";
import Manufacturer from "./characteristics/Manufacturer";
import SizeAndWeight from "./characteristics/SizeAndWeight";
import { IProductAttribute } from "../../@types/characteristic";
import { IProductItemManufacturer } from "../../@types/product";
import { IItemSize } from "../../@types/inventoryItem";
import { ListProdutData } from "../../@types/newTypes/newTypes";

export default function ProductCharacteristics({
  product,
}: IProductCharacteristicsProps) {
  return (
    <div className="product-attrs">
      <div className="product-attrs__group">
        <h3 className="product-attrs__group-header">Product Specification</h3>
        <CharacteristicItem title="Category" value={product.category.name} />
        <CharacteristicItem title="Price List" priceList={product.priceLists} />
      </div>
    </div>
  );
}

interface IProductCharacteristicsProps {
  product: ListProdutData;
}
