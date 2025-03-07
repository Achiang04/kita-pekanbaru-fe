import clsx from "clsx";
import Link from "next/link";
import { ICategoryPartial } from "../../@types/category";
import { getCategoryUrl } from "../../lib/urls";

export default function CategoryHomeMenu({
  categoryTree,
}: {
  categoryTree: ICategoryPartial[];
}) {
  return (
    <ul className="category-menu__list list-unstyled list-group">
      {categoryTree &&
        categoryTree.map((category) => {
          const showChildren =
            "children" in category &&
            category.children &&
            category.children.length > 0;
          const image = category.image
            ? {
                src: category.image.path,
                width: category.image.width,
                height: category.image.height,
              }
            : null;

          return (
            <li
              className={clsx(
                "category-menu__item list-group-item",
                showChildren && "has-children"
              )}
              key={category.category_id}
            >
              {image && (
                <img
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={category.title || ""}
                  className="me-2"
                />
              )}
              <Link href={getCategoryUrl(category)} legacyBehavior>
                {category.title}
              </Link>
              {showChildren && (
                <ul className="category-menu__child-list">
                  {category.children &&
                    category.children.map((child) => {
                      const subImg = child.image
                        ? {
                            src: child.image.path,
                            width: child.image.width,
                            height: child.image.height,
                          }
                        : null;
                      return (
                        <li key={child.category_id}>
                          {subImg && (
                            <img
                              src={subImg.src}
                              width={subImg.width}
                              height={subImg.height}
                              alt={child.title || ""}
                              className="me-2"
                            />
                          )}
                          <Link href={getCategoryUrl(child)} legacyBehavior>
                            {child.title}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              )}
            </li>
          );
        })}
    </ul>
  );
}
