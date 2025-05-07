import clsx from "clsx";
import Link from "next/link";
import { IMenuItem } from "../../@types/components";
import { useEffect } from "react";
import { ListProdutData } from "../../@types/newTypes/newTypes";

export default function FooterMenu({
  menuList,
}: {
  menuList: ListProdutData[];
}) {
  return menuList.length > 0 ? (
    <>
      <h3 className="page-footer__header">Most popular</h3>
      <ul
        className="page-footer-menu list-unstyled"
        itemScope
        itemType="//schema.org/ItemList"
      >
        {menuList.map((item, i) => (
          <li
            className={clsx("page-footer-menu__list-element", {
              active: false,
            })}
            key={item.id}
          >
            <div
              itemProp="itemListElement"
              itemScope
              itemType="//schema.org/ListItem"
            >
              <ListElement item={item} position={i} />
            </div>
          </li>
        ))}
      </ul>
    </>
  ) : null;
}

function ListElement({
  item,
  position,
}: {
  item: ListProdutData;
  position: number;
}) {
  if (item.id)
    return (
      <>
        <Link
          href={`/product/${item.id}`}
          className={clsx("page-footer-menu__element is-link", {
            active: false,
          })}
        >
          <span className="title" itemProp="name">
            {item.name}
          </span>
        </Link>
        <meta itemProp="position" content={String(position + 1)} />
      </>
    );

  return (
    <div className={clsx("page-footer-menu__element", { active: false })}>
      <span className="page-footer-menu__text-title">{item.name}</span>
    </div>
  );
}
