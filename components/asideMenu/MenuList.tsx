import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IMenuItem } from "../../@types/components";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../redux/store";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Category } from "../../@types/newTypes/newTypes";
import { useRouter } from "next/router";

export default function AsideMenuList({ menuList }: { menuList: Category[] }) {
  const router = useRouter();

  const isRouting = useAppSelector(
    (state: RootState) => state.app.isRouteChanging
  );
  const [opened, setOpened] = useState<number[]>([]);

  useEffect(() => {
    if (isRouting) return;

    // const index = menuList.findIndex((el) => el.isActive);
    // if (index !== -1) setOpened([index]);
  }, [isRouting]); //eslint-disable-line

  const toggleOpen = (index: number) => {
    setOpened((prev) => {
      if (prev.includes(index)) return prev.filter((el) => el !== index);
      return [...prev, index];
    });
  };

  return (
    <nav>
      <ul
        className="aside-menu__list list-unstyled"
        itemScope
        itemType="//schema.org/ItemList"
      >
        {menuList.map((item, i) => {
          // const hasChildren =  item.length > 0;
          const hasChildren = false;
          const isActive = router.query.slug === item.id;

          const collapsibleProps = { onClick: () => toggleOpen(i) };
          const open = hasChildren && opened.includes(i);

          return (
            <li
              className={clsx("aside-menu__root-element", {
                active: isActive,
                "has-children": hasChildren,
                open,
              })}
              key={item.id}
              {...(hasChildren ? collapsibleProps : {})}
            >
              <div
                itemProp="itemListElement"
                itemScope
                itemType="//schema.org/ListItem"
              >
                <ListElement item={item} position={i} open={open} />
              </div>
              {/* {hasChildren && <ChildList children={item.children!} />} */}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ChildList({ children }: { children: Category[] }) {
  const router = useRouter();
  return (
    <ul className="aside-menu__child-list list-unstyled">
      {children.map((childItem, j) => {
        const isActive = router.query.slug === childItem.id;

        return (
          <li key={childItem.name + j} className={clsx({ active: isActive })}>
            <ListElement item={childItem} />
          </li>
        );
      })}
    </ul>
  );
}

function ListElement({
  item,
  position,
  open,
}: {
  item: Category;
  position?: number;
  open?: boolean;
}) {
  const router = useRouter();
  // const hasChildren = item.length > 0;
  const hasChildren = false;
  const isRootElem = position !== undefined;
  const isActive = router.query.slug === item.id;

  const rootProps = { onClick: (e: React.MouseEvent) => e.preventDefault() };

  if (isRootElem || !isActive)
    return (
      <>
        <Link
          href={`/category/${item.id}`}
          className={clsx(
            "aside-menu__element is-link",
            isRootElem ? "is-root" : "is-child",
            { active: isActive }
          )}
          {...(!isRootElem ? rootProps : {})}
        >
          <span>
            <span {...(isRootElem ? { itemProp: "name" } : {})}>
              {item.name}
            </span>
          </span>
          {isRootElem && hasChildren && (
            <FontAwesomeIcon
              className="ms-2"
              icon={
                open ? (faCaretDown as IconProp) : (faCaretRight as IconProp)
              }
            />
          )}
        </Link>
        {isRootElem && (
          <meta itemProp="position" content={String(position + 1)} />
        )}
        {/* {!isRootElem && hasChildren && <ChildList children={item.children!} />} */}
      </>
    );

  return (
    <>
      <div
        className={clsx(
          "aside-menu__element",
          isRootElem ? "is-root" : "is-child",
          { active: isActive }
        )}
      >
        <span>{item.name}</span>
        {isRootElem && hasChildren && (
          <FontAwesomeIcon
            className="ms-2"
            icon={open ? (faCaretDown as IconProp) : (faCaretRight as IconProp)}
          />
        )}
      </div>
      {/* {!isRootElem && hasChildren && <ChildList children={item.children!} />} */}
    </>
  );
}
