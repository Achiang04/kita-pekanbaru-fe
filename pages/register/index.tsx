import React, { useState } from "react";
import InputField from "../../components/newComponent/auth/InputField";
import Link from "next/link";

const RegisterPage = () => {
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [nameValue, setNameValue] = useState<string>("");

  const nameInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    setPhoneValue(numericValue);
  };

  const phoneInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const formOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center w-full h-screen my-auto mx-auto">
      <div className="flex items-center justify-center w-full lg:px-12">
        <div className="flex items-center xl:px-10">
          <form
            className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
            onSubmit={formOnSubmit}
          >
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
              className="w-full py-3 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-600 focus:ring-4 focus:ring-purple-100 bg-purple-500 mb-2"
              type="submit"
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
    </div>
  );
};

export default RegisterPage;
