import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setIsLogin } from "../redux/reducers/userAuth";

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const parseJwt = (token: string) => {
    return JSON.parse(window.atob(token.split(".")[1]));
  };

  useEffect(() => {
    console.log("cek ini 1");

    const token = localStorage.getItem("access_token");

    if (token) {
      const decodeJwt = parseJwt(token);

      if (decodeJwt.exp * 1000 < Date.now()) {
        dispatch(setIsLogin(false));
        console.log("Logout");
        localStorage.removeItem("access_token");
      } else {
        console.log("Login");
        dispatch(setIsLogin(true));
      }
    } else {
      console.log("Logout");
      dispatch(setIsLogin(false));
      localStorage.removeItem("access_token");
    }
  }, [children]);

  return children;
}

export default AuthLayout;
