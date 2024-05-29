import { axiosInstance } from "../lib/axios";
import { Transaction } from "../types/Transaction";

export const getTransactions = async (page: string = "1") => {
  const response = await axiosInstance.get(`/transactions?page=${page}`);
  return response.data;
};

export const addTransaction = async (data: Transaction) => {
  const response = await axiosInstance.post("/transactions", data);
  return response.data;
};
