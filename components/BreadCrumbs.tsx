import clsx from "clsx";
import Link from "next/link";
import { IBreadCrumbItem } from "../@types/components";
import { Category, ListProdutData } from "../@types/newTypes/newTypes";

export default function BreadCrumbs({
  items,
  product,
}: {
  items?: Category;
  product?: ListProdutData;
}) {
  const richItemAttrs = {
    itemProp: "itemListElement",
    itemScope: true,
    itemType: "//schema.org/ListItem",
  };

  return (
    <nav className={clsx("breadcrumb-wrapper")}>
      {
        <ol
          className="breadcrumb"
          itemProp="breadcrumb"
          itemScope
          itemType="//schema.org/BreadcrumbList"
        >
          <li className="breadcrumb-item" {...richItemAttrs}>
            <Link href="/" itemProp="item">
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          {items && (
            <li className={clsx("breadcrumb-item", !product && "active")}>
              {product && (
                <Link href={`/category/${items.id}`}>
                  <span itemProp="name">{items.name}</span>
                </Link>
              )}
              {!product && (
                <span itemProp="item">
                  <span itemProp="name">{items.name}</span>
                </span>
              )}
              <meta itemProp="position" content={items.name} />
            </li>
          )}
          {product && (
            <li className={clsx("breadcrumb-item", "active")}>
              <span itemProp="item">
                <span itemProp="name">{product.name}</span>
              </span>
              <meta itemProp="position" content={product.name} />
            </li>
          )}
        </ol>
      }
    </nav>
  );
}
