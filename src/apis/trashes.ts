import { axiosInstance } from "../lib/axios";

export const getTrashes = async () => {
  const response = await axiosInstance.get("/trashes");
  return response.data;
};
