import { useQuery } from "@tanstack/react-query";
import { getTrashes } from "../apis/trashes";

export const useGetTrashes = (page?: string) => {
  const { data, isLoading, error } = useQuery({
    queryFn: () => getTrashes(`${page}`),
    staleTime: Infinity,
    queryKey: ["trashes", page],
  });
  return { data, isLoading, error };
};
