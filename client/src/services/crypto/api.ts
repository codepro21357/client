import { ICoinDetails, ICryptoDetails } from "@/types";
import { cryptoApi } from "../axios";

cryptoApi.defaults.headers.common["x-rapidapi-key"] =
  process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY;
cryptoApi.defaults.headers.common["x-rapidapi-host"] =
  process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST;

export const getCoinDetails = async (): Promise<ICoinDetails[]> => {
  const res = await cryptoApi.get("/coins");

  return res.data?.data?.coins;
};

export const getSingleCoinDetails = async (
  coinId: string
): Promise<ICryptoDetails> => {
  const res = await cryptoApi.get(`coin/${coinId}`);

  const data = {
    ...res.data?.data?.coin,
    dailyVolume: res.data?.data?.coin["24hVolume"],
  };

  return data;
};

export const getCoinHistory = async (coinId: string, timePeriod: string) => {
  const res = await cryptoApi.get(
    `coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`
  );

  return res.data;
};
