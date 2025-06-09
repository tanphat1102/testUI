// src/hooks/useMovies.ts
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../services/movieService";

export const useMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
};
