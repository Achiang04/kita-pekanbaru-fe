import { MouseEvent } from "react";
import Link from "next/link";
import HeaderCart from "./cart/HeaderCart";
import ChooseVariantModal from "./header/ChooseVariantModal";
import logoImg from "../assets/logoUkCrop.png";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../hooks/redux";
import { setIsOpened } from "../redux/reducers/asideMenu";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { faUser, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

export default function Header({ companyTitle }: { companyTitle?: string }) {
  const dispatch = useAppDispatch();

  const { isLogin } = useSelector((state: RootState) => state.userAuth);

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
                width={150}
                height={logoImg.height}
                alt={title}
              />
            </Link>
          </div>
          <div className="flex items-center gap-2 py-1">
            {!isLogin ? (
              <Link href={"/login"}>
                <button
                  type="button"
                  className="btn btn-action btn-resp-size"
                  style={{ marginTop: "14px", marginBottom: "14px" }}
                >
                  Login
                </button>
              </Link>
            ) : (
              <div className="flex gap-4">
                <Link
                  href={"/settings"}
                  className={"page-header__right-blocks"}
                >
                  <FontAwesomeIcon icon={faUser as IconProp} size="2x" />
                </Link>
                <Link
                  href={"/my-purchase"}
                  className={"page-header__right-blocks"}
                >
                  <FontAwesomeIcon icon={faMoneyBill as IconProp} size="2x" />
                </Link>
                <div className={"page-header__right-blocks"}>
                  <HeaderCart />
                </div>
              </div>
            )}
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
      <ChooseVariantModal />
    </header>
  );
}
