import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setIsLogin, setUserInfo } from "../redux/reducers/userAuth";
import { removeCheckoutItem } from "../redux/reducers/cart";
import Head from "next/head";

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const parseJwt = (token: string) => {
    return JSON.parse(window.atob(token.split(".")[1]));
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      const decodeJwt = parseJwt(token);

      if (decodeJwt.exp * 1000 < Date.now()) {
        dispatch(setIsLogin(false));
        console.log("Logout");
        localStorage.removeItem("access_token");
        dispatch(removeCheckoutItem());
      } else {
        console.log("Login");
        dispatch(setIsLogin(true));
        dispatch(
          setUserInfo({
            name: decodeJwt.customerName,
            phoneNumber: decodeJwt.customerPhone,
            userId: decodeJwt.customerId,
          })
        );
        console.log(decodeJwt);
      }
    } else {
      console.log("Logout");
      dispatch(setIsLogin(false));
      localStorage.removeItem("access_token");
      dispatch(removeCheckoutItem());
    }
  }, [children]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <title>{"Undangan Kita"}</title>
      </Head>
      {children}
    </>
  );
}

export default AuthLayout;
