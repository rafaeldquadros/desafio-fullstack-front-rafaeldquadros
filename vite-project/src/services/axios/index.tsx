import axios from "axios";

export const BaseURL = axios.create({
  baseURL: "https://desafiofullstack-zj8h.onrender.com",
});

export const headerAuthorizationConfig = () => {
  const token = localStorage.token;

  if (!token) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};
