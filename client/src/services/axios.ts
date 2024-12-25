import axios from "axios";

export const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

export const cryptoApi = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_CRYPTO_BASE_URL,
});
