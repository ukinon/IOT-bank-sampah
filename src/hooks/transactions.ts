import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../apis/transactions";

export const useGetTransactions = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: getTransactions,
    staleTime: Infinity,
    queryKey: ["transactions"],
  });

  return { data, isLoading, error };
};
