import { axiosInstance } from "../lib/axios";

export const getTransactions = async (page: string = "1") => {
  const response = await axiosInstance.get(`/transactions?page=${page}`);
  return response.data;
};
