import { MouseEvent } from "react";
import Link from "next/link";
import HeaderCart from "./cart/HeaderCart";
import ChooseVariantModal from "./header/ChooseVariantModal";
import logoImg from "../assets/logo.svg";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../hooks/redux";
import { setIsOpened } from "../redux/reducers/asideMenu";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function Header({ companyTitle }: { companyTitle?: string }) {
  const dispatch = useAppDispatch();

  const onHamburgerBtnClicked = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setIsOpened(true));
  };

  const title = companyTitle || "Your Company LLC.";

  return (
    <header className="page-header">
      <div className="container">
        <div className="page-header__content">
          <div className="page-header__logo">
            <Link href="/">
              <img
                src={logoImg.src}
                width={logoImg.width}
                height={logoImg.height}
                alt={title}
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href={"/login"}>
              <button type="button" className="btn btn-action btn-resp-size">
                Login
              </button>
            </Link>

            <div className={"page-header__right-blocks"}>
              <HeaderCart />
              <button
                type={"button"}
                className={"btn btn-outline-secondary page-header__hamburger"}
                onClick={onHamburgerBtnClicked}
              >
                <FontAwesomeIcon icon={faBars as IconProp} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ChooseVariantModal />
    </header>
  );
}
