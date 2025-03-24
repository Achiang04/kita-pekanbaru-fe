import { getCategoryUrl } from "./urls";
import { IMenuItem } from "../@types/components";
import { ICategory } from "../@types/category";
import { getCategoriesData } from "./apiFunction";
import { Category } from "../@types/newTypes/newTypes";

export const makeMenuByCategoryTree = ({
  categoryTree,
  isActiveClb,
}: {
  categoryTree: ICategory[];
  isActiveClb?: (category: ICategory) => boolean;
}): IMenuItem[] => {
  const menu = categoryTree.map((category) => {
    const item: IMenuItem = {
      title: category.title,
      url: getCategoryUrl(category),
    };

    if (isActiveClb) {
      item.isActive = isActiveClb(category);
    }

    if (category.children) {
      item.children = makeMenuByCategoryTree({
        categoryTree: category.children,
        isActiveClb,
      });
      if (item.children.some((el) => el.isActive)) {
        item.isActive = true;
      }
    }

    if (category.image) {
      item.img = {
        src: category.image.path,
        width: category.image.width,
        height: category.image.height,
      };
    }

    return item;
  });

  return menu;
};

export const makeAllMenus = async ({
  categoryTree,
  activeCategoryId,
}: {
  categoryTree: ICategory[];
  activeCategoryId?: number;
}): Promise<IMenus> => {
  // const mainMenu = makeMenuByCategoryTree({
  //   categoryTree,
  //   isActiveClb: (category) =>
  //     Boolean(activeCategoryId && activeCategoryId == category.category_id),
  // });
  const response = await getCategoriesData();
  let mainMenu: Category[];

  if (response.responseCode === "SUCCESS") {
    mainMenu = response.data;
  } else {
    mainMenu = [];
  }

  const footerMenu = makeMenuByCategoryTree({
    categoryTree: categoryTree.filter(({ level }) => level === 0),
  });

  return {
    mainMenu,
    footerMenu,
  };
};

interface IMenus {
  mainMenu: Category[];
  footerMenu: IMenuItem[];
}
