import axios from "axios";

const API_KEY = "efb0980b8b42689d1f254943fc972f43";
const baseURL = "https://api.themoviedb.org/3";

// Popular Movies
export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${baseURL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
};

// Popular TV Shows
export const getPopularTVShows = async () => {
  try {
    const response = await axios.get(`${baseURL}/tv/popular`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular TV shows:", error);
  }
};

//  Trending Movies
export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`${baseURL}/trending/movie/day`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
  }
};

// Trending TV Shows
export const getTrendingTVShows = async () => {
  try {
    const response = await axios.get(`${baseURL}/trending/tv/day`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching trending TV shows:", error);
  }
};

//  Upcoming Movies
export const getUpcomingMovies = async () => {
  try {
    const response = await axios.get(`${baseURL}/movie/upcoming`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
  }
};

// Today TV Shows
export const getAiringTodayTVShows = async () => {
  try {
    const response = await axios.get(`${baseURL}/tv/airing_today`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching airing today TV shows:", error);
  }
};

// Top Rated Movies
export const getTopRatedMovies = async () => {
  try {
    const response = await axios.get(`${baseURL}/movie/top_rated`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
  }
};

// Top Rated TV Shows
export const getTopRatedTVShows = async () => {
  try {
    const response = await axios.get(`${baseURL}/tv/top_rated`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top-rated TV shows:", error);
  }
};

// Popular Movies by Language
export const getPopularMoviesByLanguage = async (language: string) => {
  try {
    const response = await axios.get(`${baseURL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: language,
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies by language:", error);
  }
};

// Popular TV Shows by Language
export const getPopularTVShowsByLanguage = async (language: string) => {
  try {
    const response = await axios.get(`${baseURL}/tv/popular`, {
      params: {
        api_key: API_KEY,
        language: language,
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular TV shows by language:", error);
  }
};

// Search Movies
export const searchMovies = async (query: string, type: "movie" | "tv") => {
  try {
    const response = await axios.get(`${baseURL}/search/${type}`, {
      params: {
        api_key: API_KEY,
        query: query,
        include_adult: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching for movies:", error);
  }
};

//  get movies by genre
export const getMoviesByGenre = async (genreId: number) => {
  try {
    const response = await axios.get(`${baseURL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        language: "en-US",
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw error;
  }
};

export const getTvByGenre = async (genreId: number) => {
  try {
    const response = await axios.get(`${baseURL}/discover/tv`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        language: "en-US",
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching TV by genre:", error);
    throw error;
  }
};
// single by id
export const getDetails = async (type: "movie" | "tv", movieId: number) => {
  try {
    const [detailsResponse, creditsResponse] = await Promise.all([
      axios.get(`${baseURL}/${type}/${movieId}`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
        },
      }),
      axios.get(`${baseURL}/${type}/${movieId}/credits`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
        },
      }),
    ]);

    return {
      ...detailsResponse.data,
      cast: creditsResponse.data.cast,
      crew: creditsResponse.data.crew,
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getTvDetails = async (tvId: number) => {
  try {
    const response = await axios.get(`${baseURL}/tv/${tvId}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tv details:", error);
    throw error;
  }
};
// by actors
export const getMoviesByActor = async (actorId: number) => {
  try {
    const response = await axios.get(
      `${baseURL}/person/${actorId}/movie_credits`,
      {
        params: {
          api_key: API_KEY,
          language: "en-US",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movies by actor:", error);
    throw error;
  }
};

//get route for ott
export const getMoviesByProvider = async (providerId: number) => {
  try {
    const response = await axios.get(`${baseURL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
        with_watch_providers: providerId, // Dynamic Watch Provider ID
        watch_region: "IN",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movies for provider ${providerId}`, error);
  }
};
