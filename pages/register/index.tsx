import React, { useEffect, useState } from "react";
import InputField from "../../components/newComponent/auth/InputField";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  resetError,
  userRegister,
  userValidate,
} from "../../redux/reducers/userAuth";
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import OTPModal from "../../components/OTPModal";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import { useRouter } from "next/navigation";
import logo from "../../assets/logoUkCrop.png";

const RegisterPage = () => {
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [nameValue, setNameValue] = useState<string>("");
  const [otpValue, setOtpValue] = useState("");

  const { isLoading, isShowOTPModal, error, isLogin } = useSelector(
    (state: RootState) => state.userAuth
  );

  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      router.push("/");
    }
  }, [isLogin]);

  const nameInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const phoneInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    setPhoneValue(numericValue);
  };

  const otpInputHandler = (value: string) => {
    setOtpValue(value);
  };

  const otpOnSubmit = () => {
    const data = { phoneNumber: phoneValue, otp: otpValue };
    dispatch(userValidate(data));
  };

  const formOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userRegister({ phoneNumber: phoneValue, name: nameValue }));
  };

  return (
    <div className="flex justify-center items-center w-full h-screen my-auto mx-auto">
      <div className="flex items-center justify-center w-full lg:px-12">
        <div className="flex items-center xl:px-10">
          <form
            className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
            onSubmit={formOnSubmit}
          >
            <div className="flex items-center justify-center mb-2">
              <img src={logo.src} width={150} alt="" />
            </div>
            <h3 className="mb-3 text-4xl font-extrabold text-dark-gray-900">
              Register
            </h3>
            <p className="mb-4 text-gray-700">Enter your data</p>
            <div className="w-full mb-4 flex flex-col gap-3">
              <InputField
                id="input-name"
                label="Name"
                onChange={nameInputHandler}
                placeholder="eg: John Doe"
                type="text"
                value={nameValue}
              />
              <InputField
                id="input-phone-number"
                label="Phone Number"
                onChange={phoneInputHandler}
                placeholder="628xxxxxx"
                type="text"
                value={phoneValue}
              />
            </div>

            <button
              className="w-full py-3 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-600 focus:ring-4 focus:ring-purple-100 bg-purple-500 mb-2 disabled:bg-gray-400"
              type="submit"
              disabled={isLoading}
            >
              Register
            </button>

            <p className="text-sm leading-relaxed text-gray-900 mb-2">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-gray-700">
                login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <OTPModal
        isOpen={isShowOTPModal}
        value={otpValue}
        onChange={otpInputHandler}
        handleSubmit={otpOnSubmit}
        handleResendButton={() =>
          dispatch(userRegister({ phoneNumber: phoneValue, name: nameValue }))
        }
      />
      <ErrorSnackbar error={error} onClose={() => dispatch(resetError())} />
    </div>
  );
};

export default RegisterPage;
