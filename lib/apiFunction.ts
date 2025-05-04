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

// Product
export const getProductsData = async ({
  categoryId,
}: {
  categoryId?: string;
}) => {
  return api
    .get(`/api/v1/products?${categoryId ? `&category=${categoryId}` : ""}`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const getPopularProductsData = async () => {
  return api
    .get(`/api/v1/products/popular`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const getProductDataById = async (id: string) => {
  return api
    .get(`/api/v1/products/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
};

// Category
export const getCategoriesData = async () => {
  return api
    .get(`/api/v1/products/categories`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const getCategoriesDataById = async (id: string) => {
  return api
    .get(`/api/v1/products/categories/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
};
