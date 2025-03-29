import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setIsLogin, setUserInfo } from "../redux/reducers/userAuth";
import { removeCheckoutItem } from "../redux/reducers/cart";

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

  return children;
}

export default AuthLayout;
