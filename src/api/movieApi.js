import axios from "axios";

const API = axios.create({
  baseURL: "https://free-backend-movie.onrender.com/api/movies", // Replace with your backend URL if needed
});

// ✅ Fetch movies with pagination support
export const fetchAllMovies = (page = 1, limit = 16) =>
  API.get(`/?page=${page}&limit=${limit}`);

// ✅ Other API functions
export const fetchMovieBySlug = (slug) => API.get(`/movie/${slug}`);
export const fetchMoviesByCategory = (category, page = 1, limit = 16) =>
  API.get(`/category/${category}?page=${page}&limit=${limit}`);
export const fetchMoviesByGenre = (genre, page = 1, limit = 16) =>
  API.get(`/genre/${genre}?page=${page}&limit=${limit}`);
export const fetchCategories = () => API.get("/categories");
export const fetchGenres = () => API.get("/genres");
// 🔧 FIXED: Added page and limit to searchMovies
export const searchMovies = (query, page = 1, limit = 16) =>
  API.get(`/?search=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
