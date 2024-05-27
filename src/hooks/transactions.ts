import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../apis/transactions";

export const useGetTransactions = (page?: string) => {
  console.log(page);
  const { data, isLoading, error } = useQuery({
    queryFn: () => getTransactions(`${page}`),
    staleTime: Infinity,
    enabled: location.search != "",
    queryKey: ["transactions", page],
  });

  return { data, isLoading, error };
};
