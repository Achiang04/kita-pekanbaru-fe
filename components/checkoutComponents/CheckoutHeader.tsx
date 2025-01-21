import React, { MouseEvent } from "react";
import Container from "@mui/material/Container";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import logoImg from "../../assets/logo.svg";
import Link from "next/link";

export default function CheckoutHeader() {
  const onBackToCartClicked = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  const onLogoClicked = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  const title = "Your Company LLC.";

  return (
    <header className={"bdl-header"}>
      <Container>
        <div className={"bdl-header__body"}>
          <Link href={"/"} className={"bdl-header__to-cart"}>
            <ChevronLeftIcon /> {"Back to The Cart"}
          </Link>
          <div className={"bdl-header__logo-wrapper"}>
            <Link href={"/"} className={"bdl-header__logo"}>
              <img
                src={logoImg.src}
                width={logoImg.width}
                height={logoImg.height}
                alt={title}
              />
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
