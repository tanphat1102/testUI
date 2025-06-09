// src/services/movieService.ts
import axios from "axios";

const API_BASE = "http://localhost:3000";

export const fetchMovies = async () => {
  const res = await axios.get(`${API_BASE}/movies`);
  return res.data;
};
