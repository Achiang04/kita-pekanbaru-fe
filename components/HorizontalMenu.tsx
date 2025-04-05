import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { IMenuItem } from "../@types/components";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Category } from "../@types/newTypes/newTypes";
import { useRouter, withRouter } from "next/router";

class HorizontalMenu extends React.Component<
  HorizontalMenuProps & { router: any },
  HorizontalMenuState
> {
  protected hideTimeout: number | null = null;

  constructor(props: HorizontalMenuProps & { router: any }) {
    super(props);

    this.state = {
      visiblePopup: null,
    };
  }

  handleShow(index: number) {
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
    this.setState({
      visiblePopup: index,
    });
  }

  handleHide(index: number) {
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
    this.hideTimeout = window.setTimeout(() => {
      if (index === this.state.visiblePopup) {
        this.setState({
          visiblePopup: null,
        });
      }
    }, 300);
  }

  componentWillUnmount() {
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
  }

  render(): React.ReactNode {
    const { menuList, router } = this.props;
    const { visiblePopup } = this.state;

    const slug = router.query.slug;
    const currentId = Array.isArray(slug) ? slug[slug.length - 1] : slug;

    return (
      <nav className="horizontal-menu">
        <div className="container">
          <ul
            className="horizontal-menu__list list-unstyled"
            itemScope
            itemType="//schema.org/ItemList"
          >
            {menuList.map((item, i) => {
              // const hasChildren = item.length > 0;
              const hasChildren = false;
              const isActive = currentId === String(item.id);

              return (
                <li
                  className={clsx("horizontal-menu__root-element", {
                    active: isActive,
                    "has-children": hasChildren,
                    open: hasChildren && isActive,
                  })}
                  key={item.id + i}
                  onMouseOver={this.handleShow.bind(this, i)}
                  onMouseOut={this.handleHide.bind(this, i)}
                >
                  <div
                    itemProp="itemListElement"
                    itemScope
                    itemType="//schema.org/ListItem"
                  >
                    <ListElement item={item} position={i} hasChildren={false} />
                  </div>
                  {/* {item.children && item.children.length > 0 && (
                    <CSSTransition
                      in={visiblePopup === i}
                      timeout={600}
                      unmountOnExit
                      classNames={{
                        enterActive: "animate__animated animate__fadeInUp",
                        exitActive: "animate__animated animate__fadeOut",
                      }}
                    >
                      <ul
                        className={clsx(
                          "horizontal-menu__child-list list-unstyled"
                        )}
                      >
                        {item.children.map((childItem, j) => (
                          <li
                            key={childItem.title + j}
                            className={clsx("horizontal-menu__child-element", {
                              active: childItem.isActive,
                            })}
                          >
                            <ListElement item={childItem} />
                          </li>
                        ))}
                      </ul>
                    </CSSTransition>
                  )} */}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }
}

interface HorizontalMenuProps {
  menuList: Category[];
}

interface HorizontalMenuState {
  visiblePopup: number | null;
}

function ListElement({
  item,
  position,
  hasChildren,
}: {
  item: Category;
  position?: number;
  hasChildren?: boolean;
}) {
  const isRootElem = position !== undefined;
  const router = useRouter();

  const isActive = router.query.slug === String(item.id);

  const titleWithIcon = hasChildren ? (
    <>
      {item.name}
      {hasChildren && (
        <FontAwesomeIcon className="ms-2" icon={faCaretDown as IconProp} />
      )}
    </>
  ) : (
    item.name
  );

  if (true && (!isActive || isRootElem))
    return (
      <>
        <Link
          href={`/category/${item.id}`}
          className={clsx(
            "horizontal-menu__element is-link",
            isRootElem ? "is-root" : "is-child",
            { active: isActive }
          )}
        >
          <span className="title" {...(isRootElem ? { itemProp: "name" } : {})}>
            {isRootElem ? titleWithIcon : item.name}
          </span>
        </Link>
        {isRootElem && (
          <meta itemProp="position" content={String(position + 1)} />
        )}
      </>
    );

  return (
    <div
      className={clsx(
        "horizontal-menu__element",
        isRootElem ? "is-root" : "is-child",
        { active: isActive }
      )}
    >
      <span className="horizontal-menu__text-title">{titleWithIcon}</span>
    </div>
  );
}

export default withRouter(HorizontalMenu);
