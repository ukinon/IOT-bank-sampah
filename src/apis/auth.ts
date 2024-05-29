import { axiosInstance } from "../lib/axios";

export const login = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post("/login", data);
  return response;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.post("/me");
  return response.data;
};
