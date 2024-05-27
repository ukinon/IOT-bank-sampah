import { axiosInstance } from "../lib/axios";

export const getTransactions = async () => {
  const response = await axiosInstance.get("/transactions");
  return response.data;
};
