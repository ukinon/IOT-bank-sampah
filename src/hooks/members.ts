import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../apis/members";

export const useGetMembers = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: getMembers,
    staleTime: Infinity,
    queryKey: ["Members"],
  });

  return { data, isLoading, error };
};
