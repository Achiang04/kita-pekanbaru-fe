import { IProductAttribute } from "../../../@types/characteristic";
import { ListPrice } from "../../../@types/newTypes/newTypes";
import useFormatCurrency from "../../../hooks/useFormatCurrency";

export default function CharacteristicItem({
  title,
  value,
  priceList,
}: {
  title: string;
  value?: string;
  priceList?: ListPrice[];
}) {
  const { formatRupiah } = useFormatCurrency();
  return (
    <>
      <dl className="product-attrs__item">
        <dt className="product-attrs__item-name-wrapper">
          <span className="product-attrs__item-name">{title}</span>
        </dt>
        {value && (
          <dd className="product-attrs__item-value">
            <div>{value}</div>
          </dd>
        )}

        <dd className="product-attrs__item-value">
          {priceList &&
            priceList.map((val) => (
              <div>
                min Qty {val.minQty} for {formatRupiah(val.price)}
              </div>
            ))}
        </dd>
      </dl>
      <div
        itemProp="additionalProperty"
        itemScope
        itemType="//schema.org/PropertyValue"
      >
        <meta itemProp="name" content={title} />
        <meta itemProp="value" content={value} />
      </div>
    </>
  );
}
