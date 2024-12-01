import React, { useState, useEffect } from "react";
import Api from "../../api";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch movies from TMDb API
  const fetchMovies = async () => {
    console.log(page, 'page')
    setIsLoading(true);
    try {
      const data = await Api.getMovies(page);
      setMovies(data.results);
      setFilteredMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  useEffect(() => {
    const filtered = movies.filter((movie) =>
      movie.original_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchTerm, movies]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Search by movie title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded shadow-sm"
        />

        {isLoading ? (
          <p>Loading movies...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredMovies.map((movie) => (
              <div
              key={movie.id}
              className="p-4 bg-cover bg-center rounded shadow hover:shadow-md"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                height: "300px", 
              }}
            >
              <div className="bg-black bg-opacity-50 p-2 rounded text-white h-full flex flex-col justify-end">
                <h2 className="text-lg font-bold">{movie.original_title}</h2>
                <p className="text-sm">Release Date: {movie.release_date}</p>
              </div>
            </div>
            ))}
            {filteredMovies.length === 0 && (
              <p className="text-gray-500 col-span-full text-center">
                No movies found.
              </p>
            )}
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className={`px-4 py-2 bg-gray-200 rounded ${
              page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
            }`}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={`px-4 py-2 bg-gray-200 rounded ${
              page === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
