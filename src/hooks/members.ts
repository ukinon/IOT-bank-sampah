import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../apis/members";

export const useGetMembers = (page: string) => {
  const { data, isLoading, error } = useQuery({
    queryFn: () => getMembers(`${page}`),
    staleTime: Infinity,
    queryKey: ["members", page],
  });

  return { data, isLoading, error };
};
