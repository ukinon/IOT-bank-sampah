import { axiosInstance } from "../lib/axios";

export const getMembers = async () => {
  const response = await axiosInstance.get("/members");
  return response.data;
};
