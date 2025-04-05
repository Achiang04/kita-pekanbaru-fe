import clsx from "clsx";
import Link from "next/link";
import { IMenuItem } from "../@types/components";
import { Category } from "../@types/newTypes/newTypes";

export default function VerticalMenu({ menuList }: { menuList: Category[] }) {
  return (
    <nav className="vertical-menu">
      <ul
        className="vertical-menu__list list-unstyled mb-0"
        itemScope
        itemType="//schema.org/ItemList"
      >
        {menuList.map((item, i) => {
          // const hasChildren = item.length > 0;
          const hasChildren = false;
          const isActive = false;
          return (
            <li
              className={clsx({
                active: isActive,
                "has-children": hasChildren,
                open: hasChildren && isActive,
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
              {/* {item.children && item.children.length > 0 &&
								<ul className='vertical-menu__child-list list-unstyled'>
									{item.children.map((childItem, j) =>
										<li key={childItem.title + j} className={clsx({active: childItem.isActive})}>
											<ListElement item={childItem} />
										</li>)}
								</ul>} */}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ListElement({
  item,
  position,
}: {
  item: Category;
  position?: number;
}) {
  const isRootElem = position !== undefined;
  const isActive = false;

  return (
    <>
      {!isActive ? (
        <>
          <Link
            href={`/category/${item.id}`}
            className={clsx(
              "vertical-menu__link title",
              isRootElem ? "is-root" : "is-child"
            )}
            itemProp="url"
          >
            {isRootElem ? <span itemProp="name">{item.name}</span> : item.name}
          </Link>
          {isRootElem && (
            <meta itemProp="position" content={String(position + 1)} />
          )}
        </>
      ) : (
        <span
          className={clsx(
            "vertical-menu__text-title",
            isRootElem ? "is-root" : "is-child"
          )}
        >
          {item.name}
        </span>
      )}
    </>
  );
}
