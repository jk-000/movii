import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchMovies } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const query = useQuery().get("q");
  const navigate = useNavigate();
  const location = useLocation();

  // Get page from URL (default to 1 if not provided)
  const pageFromUrl = new URLSearchParams(location.search).get("page") || 1;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 16; // Number of movies per page

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?q=${query}&page=${page}`); // Add page query to the URL
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on page load
    if (query) {
      setLoading(true);
      setError("");
      searchMovies(query, currentPage, limit) // Fetch movies based on query, page, and limit
        .then((res) => {
          setResults(res.data.movies || []);
          setTotalMovies(res.data.totalMovies || 0);
          setTotalPages(res.data.totalPages || 1);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Search failed", err);
          setError("Something went wrong while searching.");
          setLoading(false);
        });
    }
  }, [query, currentPage]); // Trigger useEffect on query or currentPage change

  useEffect(() => {
    const pageFromUrl = parseInt(
      new URLSearchParams(location.search).get("page") || "1",
      10
    );
    setCurrentPage(pageFromUrl);
  }, [location.search]);

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8 py-4">
      <SearchBar />
      <h1 className="text-xl font-bold mt-10 mb-4">Search Results for: "{query}"</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin h-8 w-8 border-t-2 border-blue-600 rounded-full"></div>
        </div>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : results.length === 0 ? (
        <p>
          No movies found. Please check the spelling or try a different search term.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {results.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>

          {/* Pagination Component */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Search;
