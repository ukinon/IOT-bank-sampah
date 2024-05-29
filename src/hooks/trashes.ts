import { useQuery } from "@tanstack/react-query";
import { getTrash, getTrashes } from "../apis/trashes";

export const useGetTrashes = (page?: string) => {
  const { data, isLoading, error } = useQuery({
    queryFn: () => getTrashes(`${page}`),
    staleTime: Infinity,
    queryKey: ["trashes", page],
  });
  return { data, isLoading, error };
};
export const useGetTrash = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryFn: () => getTrash(id),
    staleTime: Infinity,
    queryKey: ["trash", id],
  });
  return { data, isLoading, error };
};
