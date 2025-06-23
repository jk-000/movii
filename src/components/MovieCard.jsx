import { useState } from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const [loading, setLoading] = useState(true);  // Loading state for the image

  const handleImageLoad = () => {
    setLoading(false);  // Image has loaded, so stop showing the loader
  };

  return (
    <div className="cursor-pointer bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 block">
      <Link to={`/movie/${movie.slug}`}>
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[420px]">
          {/* Show loader while image is loading */}
          {loading && (
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-10">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={movie.poster}
            alt={movie.title}
            className={`w-full h-full object-cover ${loading ? "opacity-0" : "opacity-100"}`} // Hide the image until it loads
            onLoad={handleImageLoad}  // Trigger loading state change when image loads
          />
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-md text-sm shadow-md font-medium">
            ⭐ {movie.rating}
          </div>
        </div>
        <div className="p-3 bg-white">
          <h3 className="text-black font-normal">{movie.title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
