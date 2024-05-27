import { axiosInstance } from "../lib/axios";

export const getTrashes = async (page: string) => {
  const response = await axiosInstance.get(`/trashes?page=${page}`);
  return response.data;
};
