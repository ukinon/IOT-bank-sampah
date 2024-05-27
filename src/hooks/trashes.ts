import { useQuery } from "@tanstack/react-query";
import { getTrashes } from "../apis/trashes";

export const useGetTrashes = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: getTrashes,
    staleTime: Infinity,
    queryKey: ["trashes"],
  });
  return { data, isLoading, error };
};
