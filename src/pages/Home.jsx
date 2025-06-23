import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllMovies,
  fetchGenres,
  fetchCategories,
} from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Preloader from "../components/Preloader";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const limit = 16;

  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page")) || 1;

  // Fetch movies using React Query
  const {
    data: movieData,
    isLoading: isMoviesLoading,
    isError: isMoviesError,
  } = useQuery({
    queryKey: ["movies", page],
    queryFn: () => fetchAllMovies(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
  });

  // Fetch filters (genres + categories)
  const {
    data: filtersData,
    isLoading: isFiltersLoading,
    isError: isFiltersError,
  } = useQuery({
    queryKey: ["filters"],
    queryFn: async () => {
      const [genreRes, categoryRes] = await Promise.all([
        fetchGenres(),
        fetchCategories(),
      ]);

      const genres = Array.isArray(genreRes.data)
        ? genreRes.data
        : genreRes.data.genres || [];

      const categories = Array.isArray(categoryRes.data)
        ? categoryRes.data
        : categoryRes.data.categories || [];

      const combined = [
        ...genres.map((label) => ({ label, type: "genre" })),
        ...categories.map((label) => ({ label, type: "category" })),
      ].filter((item) => item.label);

      const uniqueSorted = Array.from(
        new Map(combined.map((obj) => [obj.label.toLowerCase(), obj])).values()
      ).sort((a, b) => a.label.localeCompare(b.label));

      return uniqueSorted;
    },
    staleTime: Infinity,
  });

  const handlePageChange = (newPage) => {
    navigate(`?page=${newPage}`);
    window.scrollTo(0, 0);
    window.scrollTo(0, 0);
  };

  const movies = movieData?.data?.movies || [];
  const totalPages = movieData?.data?.totalPages || 1;

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8 py-4">
      {/* Loading */}
      {(isMoviesLoading || isFiltersLoading) && <Preloader />}

      {/* Genre + Category Filters */}
      <div className="mb-6 flex flex-wrap gap-2 justify-center sm:justify-start">
        {filtersData?.map((item, idx) => (
          <button
            key={idx}
            onClick={() =>
              navigate(`/${item.type}/${item.label.toLowerCase()}`)
            }
            className="px-4 py-1.5 cursor-pointer bg-blue-500 text-white rounded-md text-sm hover:bg-blue-700 transition-all"
          >
            {item.label.charAt(0).toUpperCase() +
              item.label.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* Page Title */}
      <h1 className="text-[28px] font-bold mt-10 mb-5 sm:text-left">
        {page === 1 ? "Latest Movies 🔥" : `Page - ${page}`}
      </h1>

      {/* Movie Grid */}
      {isMoviesError ? (
        <p className="text-red-600 text-center text-xl mt-10 font-semibold">
          Server error, movies are temporarily unavailable. It will be fixed
          within 24 hours. Please wait...
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
