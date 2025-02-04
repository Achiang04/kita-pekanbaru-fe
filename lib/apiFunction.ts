const url = process.env.API_URL;

export const postUserRegister = async (name: string, phoneNumber: string) => {
  const data = { name, gsm: phoneNumber };

  return fetch(`${url}/api/v1/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};

export const postUserLogin = async (phoneNumber: string) => {
  const data = { gsm: phoneNumber };

  return fetch(`${url}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};

export const postVerifyUser = async (phoneNumber: string, otp: string) => {
  const data = { gsm: phoneNumber, otp };

  return fetch(`${url}/api/v1/auth/login/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};
