import { message } from "antd";
import { getCurrentUser, login } from "../apis/auth";
import { axiosInstance } from "../lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
  axiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    error: userErrorData,
    refetch: refetchUser,
  } = useQuery({
    queryFn: async () => await getCurrentUser(),
    staleTime: Infinity,
    queryKey: ["get-current-user", localStorage.getItem("token")],
  });
  const can = (permissions: string[]): boolean => {
    if (!userData) {
      return false;
    }
    return permissions?.some((perm) =>
      (userData?.data?.permissions || []).includes(perm)
    );
  };
  return { userData, userLoading, can, userError, userErrorData, refetchUser };
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const {
    data: loginData,
    mutateAsync: loginMutation,
    isPending: loginPending,
    error: loginError,
    isSuccess: loginSuccess,
  } = useMutation({
    mutationFn: async (data: { email: string; password: string }) =>
      await login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-current-user"] });
      message.success("Berhasil login");
    },
    onError: () => {
      message.error("Berhasil login");
    },
  });

  return {
    loginData,
    loginMutation,
    loginPending,
    loginError,
    loginSuccess,
  };
};
