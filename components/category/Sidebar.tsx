import clsx from "clsx";
import Link from "next/link";
import { getCategoryUrl } from "../../lib/urls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { useMemo } from "react";
import { ICategoryFlatItem, ICategoryItem } from "../../@types/category";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function CategorySidebar({
  category,
}: {
  category: ICategoryItem;
}) {
  const categoryMenu = useMemo<ICategoryFlatItem[]>(() => {
    if (category.children?.length) {
      return Array.from(category.children);
    } else if (category.siblings?.length) {
      return category.siblings.filter(
        ({ parent_id }) => category.parent_id === parent_id
      );
    }

    return [];
  }, [category.category_id]); //eslint-disable-line

  const parentsBreadCrumbs = useMemo<ICategoryFlatItem[]>(() => {
    if (category.parent_id && category.parents) {
      const parents = Array.from(category.parents).reverse();

      if (!category.children?.length) {
        parents.splice(-1, 1);
      }

      return parents;
    }

    return [];
  }, [category.category_id]); //eslint-disable-line

  if (!categoryMenu.length) return null;

  return (
    <nav
      className={clsx("category-sidebar", {
        "with-breadcrumbs": parentsBreadCrumbs.length,
      })}
    >
      {parentsBreadCrumbs.length > 0 && (
        <ul className={"category-sidebar__parents list-unstyled"}>
          {parentsBreadCrumbs.map((item) => (
            <li key={item.category_id}>
              {item.category_id === category.category_id ? (
                <strong>{item.title}</strong>
              ) : (
                <Link href={getCategoryUrl(item)}>
                  <FontAwesomeIcon
                    icon={faChevronLeft as IconProp}
                    size={"xs"}
                  />{" "}
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}

      <ul
        className="category-sidebar__list list-unstyled"
        itemScope
        itemType="//schema.org/ItemList"
      >
        {categoryMenu.map((item, i) => {
          const categoryUrl = getCategoryUrl(item);
          const image = item.image
            ? {
                src: item.image.path,
                width: item.image.width,
                height: item.image.height,
              }
            : null;

          return (
            <li
              className={clsx({
                active: category.category_id === item.category_id,
              })}
              key={item.category_id}
            >
              <div
                itemProp="itemListElement"
                itemScope
                itemType="//schema.org/ListItem"
              >
                {image && (
                  <Link href={categoryUrl} className={"img-link"}>
                    <img
                      src={image.src}
                      alt={item.title}
                      width={image.width}
                      height={image.height}
                    />
                  </Link>
                )}
                <Link href={categoryUrl} className={"title"} itemProp="url">
                  <span itemProp="name">{item.title}</span>
                </Link>
                <meta itemProp="position" content={String(i + 1)} />
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
