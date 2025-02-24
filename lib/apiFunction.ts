import axios from "axios";

const url = process.env.API_URL;

const api = axios.create({
  baseURL: url,
});

export const postUserRegister = async (name: string, phoneNumber: string) => {
  const data = { name, gsm: phoneNumber };

  return api
    .post("/api/v1/auth/register", data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res)
    .catch((err) => err);
};

export const postUserLogin = async (phoneNumber: string) => {
  const data = { gsm: phoneNumber };

  return api
    .post("/api/v1/auth/login", data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res)
    .catch((err) => err);
};

export const postValidateUser = async (phoneNumber: string, otp: string) => {
  const data = { gsm: phoneNumber, otp };

  return api
    .post("/api/v1/auth/validate", data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res)
    .catch((err) => err);
};
