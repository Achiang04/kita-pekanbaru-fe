import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";

const Navigate = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return null;
};

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
  const { isLogin } = useSelector((state: RootState) => state.userAuth);
  const [load, setLoad] = useState(true);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    setLoad(true);
    const token = localStorage.getItem("access_token");

    if (token && isLogin) {
      setLoginStatus(true);
      setLoad(false);
    } else if (!token && !isLogin) {
      setLoginStatus(false);
      setLoad(false);
    }
  }, [isLogin]);

  if (!load && loginStatus) {
    return children;
  } else if (!load && !loginStatus) {
    return <Navigate />;
  } else {
    return null;
  }
};

export default ProtectedLayout;
