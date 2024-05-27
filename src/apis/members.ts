import { axiosInstance } from "../lib/axios";

export const getMembers = async (page: string = "1") => {
  const response = await axiosInstance.get(`/members?page=${page}`);
  return response.data;
};
