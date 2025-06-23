import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovieBySlug, fetchGenres, fetchCategories } from "../api/movieApi";
import { Helmet } from "react-helmet-async"; // ✅ Import Helmet

const MovieDetail = () => {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetchMovieBySlug(slug)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load movie", err);
        setLoading(false);
      });

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
        ]
          .filter((item) => item.label)
          .sort((a, b) => a.label.localeCompare(b.label));

        setFilters(combined);
      })
      .catch((err) => console.error("Error loading genres/categories", err));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-600 border-solid"></div>
      </div>
    );
  }

  if (!movie) return <p className="p-4">No movie found.</p>;

  return (
    <div className="bg-gray-200 sm:container mt-10 mb-15 sm:mx-auto sm:px-4 sm:flex sm:justify-center px-[10px] mx-[10px] sm:mx-0 sm:px-0">
      <Helmet>
        <title>{`${movie.title} | Watch & Download | CodeBuck Movies`}</title>
        <meta
          name="description"
          content={movie.description?.slice(0, 150) || "Watch and download latest movies online for free."}
        />
        <meta property="og:title" content={movie.title} />
        <meta property="og:description" content={movie.description?.slice(0, 150)} />
        <meta property="og:image" content={movie.poster} />
        <meta property="og:url" content={`https://yourdomain.com/movie/${slug}`} />
        <meta name="keywords" content={`Watch ${movie.title}, Download ${movie.title}, ${movie.genre?.join(", ")}`} />
      </Helmet>

      <div className="bg-transparent sm:bg-white shadow-none sm:shadow-lg p-0 sm:p-4 sm:px-10 w-full max-w-4xl">
        {/* Filter Buttons */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {filters.map((item, idx) => (
            <button
              key={idx}
              onClick={() =>
                navigate(`/${item.type}/${item.label.toLowerCase()}`)
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-all cursor-pointer"
            >
              {item.label.charAt(0).toUpperCase() +
                item.label.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <hr className="my-4 border-gray-300" />

        <h1 className="text-2xl font-semibold mb-10 text-center">{movie.title}</h1>

        <div className="text-center">
          <img src={movie.poster} alt={movie.title} className="w-full max-w-md mx-auto mb-5" />
          {movie.shortName && (
            <p className="text-2xl font-bold mb-4">{movie.shortName}</p>
          )}
        </div>

        <hr className="my-4 border-gray-300" />

        <div className="mb-4 text-[18px] text-center">
          <p className="mb-2">
            <strong>Rating:</strong>{" "}
            {movie.rating ? (
              <span className="text-red-600 font-semibold">{movie.rating}</span>
            ) : (
              <span className="text-gray-400">Not Available</span>
            )}
            /10
          </p>

          {movie.genre?.length > 0 && (
            <p className="mb-2">
              <strong>Genres:</strong> {movie.genre.join(", ")}
            </p>
          )}

          {movie.starCast?.length > 0 && (
            <p className="mb-2">
              <strong>Stars:</strong> {movie.starCast.join(", ")}
            </p>
          )}

          {movie.director && (
            <p className="mb-2">
              <strong>Director:</strong> {movie.director}
            </p>
          )}

          {movie.creator && (
            <p className="mb-2">
              <strong>Creator:</strong> {movie.creator}
            </p>
          )}

          {movie.language && (
            <p className="mb-2">
              <strong>Language:</strong> {movie.language}
            </p>
          )}

          {movie.quality && (
            <p className="mb-4">
              <strong>Quality:</strong> {movie.quality}
            </p>
          )}
        </div>

        <hr className="my-4 border-gray-300" />

        {(movie.screenshots?.length > 0 || movie.downloadLinks?.length > 0) && (
          <div className="mb-6 sm:block flex flex-col gap-4">
            <div className="sm:mb-6 sm:w-full w-full">
              {movie.screenshots?.length > 0 && (
                <>
                  <h3 className="text-3xl font-bold mb-4 text-center text-red-600 sm:block">Screenshots:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[5px]">
                    {movie.screenshots.map((url, i) => (
                      <img key={i} src={url} alt="screenshot" className="w-full shadow-md" />
                    ))}
                  </div>
                </>
              )}
            </div>

            <hr className="my-4 border-gray-300" />

            <div className="sm:w-full w-full">
              {movie.downloadLinks?.length > 0 && (
                <>
                  <h3 className="text-3xl font-bold mb-8 text-center text-red-600 sm:block">Download Links:</h3>
                  <hr className="my-4 border-gray-300" />
                  <div className="flex flex-wrap gap-2 justify-center">
                    {movie.downloadLinks.map((dl, i) => (
                      <a
                        key={i}
                        href={dl.link}
                        className="px-6 py-3 bg-blue-600 text-white rounded-md text-x hover:bg-blue-700 transition-all cursor-pointer"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {dl.resolution}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {movie.isWebSeries && movie.episodes?.length > 0 && (
          <>
            <h3 className="text-3xl font-bold mb-8 text-center text-red-600 sm:block">Single Episode Links:</h3>
            <hr className="my-4 border-gray-300" />
            <div className="flex flex-wrap gap-2 justify-center">
              {movie.episodes.map((ep, i) => (
                <a
                  key={i}
                  href={ep}
                  className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Episode {i + 1}
                </a>
              ))}
            </div>
          </>
        )}

        <hr className="mt-8 mb-5 border-gray-300" />

        {movie.trailer && (
          <div className="mb-6">
            <div className="w-full aspect-[16/9]">
              {movie.trailer.includes("youtube.com") || movie.trailer.includes("youtu.be") ? (
                <iframe
                  src={movie.trailer.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
                  title="Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              ) : (
                <p className="text-center text-red-600">Trailer link is not supported or invalid.</p>
              )}
            </div>
          </div>
        )}

        <hr className="my-4 border-gray-300" />

        {movie.description && (
          <div className="text-left">
            <p>{movie.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
