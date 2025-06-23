import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchMoviesByCategory,
  fetchGenres,
  fetchCategories,
} from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 16;

  const getPageFromUrl = () => {
    const query = new URLSearchParams(location.search);
    return parseInt(query.get("page")) || 1;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`/category/${category}?page=${page}`);
  };

  // Fetch category movies
  const {
    data: movieData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categoryMovies", category, getPageFromUrl()],
    queryFn: () =>
      fetchMoviesByCategory(category.toLowerCase(), getPageFromUrl(), limit),
    keepPreviousData: true,
  });

  const movies = movieData?.data?.movies || [];
  const totalMovies = movieData?.data?.totalMovies || 0;
  const totalPages = Math.ceil(totalMovies / limit);

  // Fetch genres and categories
  useEffect(() => {
    Promise.all([fetchGenres(), fetchCategories()])
      .then(([genreRes, categoryRes]) => {
        const genreArray = Array.isArray(genreRes.data)
          ? genreRes.data
          : genreRes.data.genres || [];
        const categoryArray = Array.isArray(categoryRes.data)
          ? categoryRes.data
          : categoryRes.data.categories || [];

        const combined = [
          ...genreArray.map((item) => ({ label: item, type: "genre" })),
          ...categoryArray.map((item) => ({ label: item, type: "category" })),
        ].filter((item) => item.label);

        const uniqueSorted = Array.from(
          new Map(
            combined.map((obj) => [obj.label.toLowerCase(), obj])
          ).values()
        ).sort((a, b) => a.label.localeCompare(b.label));
        window.scrollTo(0, 0);
        setFilters(uniqueSorted);
      })
      .catch((err) => console.error("Error loading genres/categories", err));
  }, []);

  // SEO Setup
  useEffect(() => {
    const capitalized =
      category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

    document.title = `${capitalized} Movies | JKHub Movies`;

    const descriptionContent = `Watch or download the latest ${capitalized} movies and web series for free in HD on JKHub Movies.`;
    let metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute("content", descriptionContent);
    } else {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      metaDesc.content = descriptionContent;
      document.head.appendChild(metaDesc);
    }

    const keywords = `JKHub Movies, ${capitalized} Movies, ${capitalized} Web Series Download, Watch ${capitalized} Movies Online Free`;
    let metaKeywords = document.querySelector("meta[name='keywords']");
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords);
    } else {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      metaKeywords.content = keywords;
      document.head.appendChild(metaKeywords);
    }
  }, [category]);

  // Scroll to top on location change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8 py-4">
      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((item, idx) => (
          <button
            key={idx}
            onClick={() =>
              navigate(`/${item.type}/${item.label.toLowerCase()}`)
            }
            className="px-4 py-1.5 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-700 cursor-pointer transition-all"
          >
            {item.label.charAt(0).toUpperCase() +
              item.label.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <SearchBar />

      <h1 className="text-2xl font-bold mt-10 mb-4 uppercase">
        {currentPage === 1
          ? `${category.charAt(0).toUpperCase() + category.slice(1)} Movies`
          : `Page ${currentPage}`}
      </h1>

      {/* Loader / Error / Content */}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      ) : isError ? (
        <p className="text-red-600 text-center text-xl mt-10 font-semibold">
          Error fetching movies. Please try again later.
        </p>
      ) : (
        <>
          {movies.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {movies.map((movie) => (
                  <MovieCard key={movie._id} movie={movie} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <p className="text-red-600 text-center text-xl mt-10 font-semibold">
              No movies available in this category.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage;
