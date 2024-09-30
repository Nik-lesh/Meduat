import React, { useState } from "react";
import {
  SimpleGrid,
  SegmentedControl,
  Box,
  Group,
  Select,
  useMantineTheme,
  Input,
  Loader,
} from "@mantine/core";
import Masonry from "react-masonry-css";

import {
  getTrendingMovies,
  getAiringTodayTVShows,
  getMoviesByGenre,
  getPopularMovies,
  getPopularMoviesByLanguage,
  getPopularTVShows,
  getPopularTVShowsByLanguage,
  getTopRatedMovies,
  getTopRatedTVShows,
  getTrendingTVShows,
  getUpcomingMovies,
  getTvByGenre,
  getDetails,
} from "./assets/routes";
import { MovieCard } from "./assets/CardView";
import { movieGenres } from "./assets/genre";
import useFetchData from "../../components/Hook";
import { AppContainer } from "../../components/Container";
// import Search from "./search";
import { MagnifyingGlass } from "phosphor-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RenderMovies = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const [fetchdata, setFetchdata] = useState(() => getTrendingMovies);
  const { data: movies, loading } = useFetchData(fetchdata);
  const [selectedCategory, setSelectedCategory] = useState("movies");
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"movie" | "tv">("movie");
  const [results, setResults] = useState<any[]>([]);

  const handleMoviesOrTv = (value: string) => {
    setSelectedCategory(value);

    if (value === "movies") {
      setType("movie");
      console.log("type", setType);
      setFetchdata(() => getTrendingMovies);
    } else if (value === "tv") {
      setType("tv");
      setFetchdata(() => getTrendingTVShows);
    }
    setResults([]);
  };
  // handle search from route is not working need to fix it.
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // to prevent the browser from reload which is standard behaviour
    if (query.trim() === "") return;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/${type}`,
        {
          params: {
            api_key: "efb0980b8b42689d1f254943fc972f43",
            query: query,
          },
        }
      );

      if (response && response.data.results) {
        console.log(response.data.results);
        setResults(response.data.results);
      } else {
        console.error("No results found.");
      }
    } catch (error) {
      console.error("Error in search:", error);
      setFetchdata(() => getTrendingMovies);
    }
  };

  const languageMappingsMovies: Record<string, string> = {
    //key value
    english: "en",
    spanish: "es",
    chinese: "zh",
    korean: "ko",
  };

  const languageMappingsTV: Record<string, string> = {
    english: "en",
    spanish: "es",
    chinese: "zh",
    korean: "ko",
  };

  const handleByOTT = (value: string) => {
    const languageCode =
      selectedCategory === "movies"
        ? languageMappingsMovies[value]
        : languageMappingsTV[value];

    if (languageCode) {
      const fetchFunction =
        selectedCategory === "movies"
          ? () => getPopularMoviesByLanguage(languageCode)
          : () => getPopularTVShowsByLanguage(languageCode);

      setFetchdata(() => fetchFunction);
    }
  };

  const genreMappingsMovies: Record<string, number> = {
    action: 28,
    adventure: 12,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    fantasy: 14,
    history: 36,
    horror: 27,
    music: 10402,
    mystery: 9648,
    romance: 10749,
    scienceFiction: 878,
    tvMovie: 10770,
    thriller: 53,
    war: 10752,
    western: 37,
  };

  const genreMappingsTV: Record<string, number> = {
    actionAndAdventure: 10759,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    kids: 10762,
    mystery: 9648,
    news: 10763,
    reality: 10764,
    sciFiAndFantasy: 10765,
    soap: 10766,
    talk: 10767,
    warAndPolitics: 10768,
    western: 37,
  };

  const handleGenre = (value: string) => {
    const genreId =
      selectedCategory === "movies"
        ? genreMappingsMovies[value]
        : genreMappingsTV[value];

    if (genreId !== undefined) {
      const fetchFunction =
        selectedCategory === "movies"
          ? () => getMoviesByGenre(genreId)
          : () => getTvByGenre(genreId);

      setFetchdata(() => fetchFunction);
    }
  };

  const fetchFunctionsMovies: Record<string, () => Promise<any>> = {
    trending: getTrendingMovies,
    popular: getPopularMovies,
    topRated: getTopRatedMovies,
    newRelease: getUpcomingMovies,
  };

  const fetchFunctionsTV: Record<string, () => Promise<any>> = {
    trending: getTrendingTVShows,
    popular: getPopularTVShows,
    topRated: getTopRatedTVShows,
    newRelease: getAiringTodayTVShows,
  };

  const handleSelectChangeMovies = (value: string) => {
    const fetchFunction =
      selectedCategory === "movies"
        ? fetchFunctionsMovies[value]
        : fetchFunctionsTV[value];

    if (fetchFunction) {
      setFetchdata(() => fetchFunction);
    }
  };

  const segmentControl = [
    { value: "movies", label: "Movies" },
    { value: "tv", label: "TVShows" },
  ];

  const sortOptions1 = [
    {
      value: "trending",
      label: "Trending",
    },
    { value: "popular", label: "Most Popular" },
    { value: "topRated", label: "Top Rated" },
    { value: "newRelease", label: "New Release" },
  ];

  const tvGenresOptions = [
    { value: "actionAndAdventure", label: "Action & Adventure" },
    { value: "animation", label: "Animation" },
    { value: "comedy", label: "Comedy" },
    { value: "crime", label: "Crime" },
    { value: "documentary", label: "Documentary" },
    { value: "drama", label: "Drama" },
    { value: "family", label: "Family" },
    { value: "kids", label: "Kids" },
    { value: "mystery", label: "Mystery" },
    { value: "news", label: "News" },
    { value: "reality", label: "Reality" },
    { value: "sciFiAndFantasy", label: "Sci-Fi & Fantasy" },
    { value: "soap", label: "Soap" },
    { value: "talk", label: "Talk" },
    { value: "warAndPolitics", label: "War & Politics" },
    { value: "western", label: "Western" },
  ];
  const movieGenresOptions = [
    { value: "action", label: "Action" },
    { value: "adventure", label: "Adventure" },
    { value: "animation", label: "Animation" },
    { value: "comedy", label: "Comedy" },
    { value: "crime", label: "Crime" },
    { value: "documentary", label: "Documentary" },
    { value: "drama", label: "Drama" },
    { value: "family", label: "Family" },
    { value: "fantasy", label: "Fantasy" },
    { value: "history", label: "History" },
    { value: "horror", label: "Horror" },
    { value: "music", label: "Music" },
    { value: "mystery", label: "Mystery" },
    { value: "romance", label: "Romance" },
    { value: "scienceFiction", label: "Science Fiction" },
    { value: "tvMovie", label: "TV Movie" },
    { value: "thriller", label: "Thriller" },
    { value: "war", label: "War" },
    { value: "western", label: "Western" },
  ];

  const sortOptions2 =
    selectedCategory === "movies" ? movieGenresOptions : tvGenresOptions;

  const sortOptions3 = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "chinese", label: "Chinese" },
    { value: "korean", label: "Korean" },
  ];

  const handleCardClick = async (id: number, type: "movie" | "tv") => {
    try {
      const details = await getDetails(type, id);
      console.log(details);
      navigate(`/details/${type}/${id}`, { state: { details }, replace: true });
    } catch (error) {
      console.error("Error fetching details", error);
    }
  };

  const moviesToDisplay = results.length > 0 ? results : movies;

  return (
    <>
      <AppContainer>
        <Box my={12}>
          <Group position="apart">
            <SegmentedControl
              radius={16}
              size="xs"
              fullWidth
              data={segmentControl}
              onChange={handleMoviesOrTv}
              style={{
                width: 400,
                backgroundColor:
                  theme.colorScheme === "dark" ? "#0A0E14" : "#C7B7A3",
                color: "#F2E2D4",
              }}
            />
            <form onSubmit={handleSearch || "No"}>
              <Input
                size="xs"
                radius={16}
                icon={<MagnifyingGlass size={16} />}
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: 870,
                  backgroundColor:
                    theme.colorScheme === "dark" ? "#0A0E14" : "#F2E2D4",
                }}
                // sx={{
                //   color: "#F2E2D4",
                // }}
              />
            </form>
          </Group>
        </Box>
        <Box>
          <Group pb="xl" position="apart">
            <Select
              radius={16}
              size="xs"
              label="Choose one"
              placeholder="Select one"
              onChange={handleSelectChangeMovies}
              data={sortOptions1}
              sx={{
                width: 400,
              }}
              // styles={{
              //   input: {
              //     backgroundColor:
              //       theme.colorScheme === "dark" ? "#0A0E14" : "#E8D8CA", // Input (select bar)
              //   },
              //   dropdown: {
              //     backgroundColor:
              //       theme.colorScheme === "dark" ? "#1C1F26" : "#FFF5E6", // Dropdown
              //   },
              //   item: {
              //     "&[data-hovered]": {
              //       backgroundColor: "#800000", // Hover color for items
              //       color: "#fff", // Text color on hover
              //     },
              //   },
              // }}
            />

            <Select
              radius={16}
              size="xs"
              label="Select genre"
              placeholder="Select one"
              onChange={handleGenre}
              data={sortOptions2}
              style={{
                width: 400,
              }}
              // styles={{
              //   input: {
              //     backgroundColor:
              //       theme.colorScheme === "dark" ? "#0A0E14" : "#E8D8CA", // Input (select bar)
              //   },
              //   dropdown: {
              //     backgroundColor:
              //       theme.colorScheme === "dark" ? "#1C1F26" : "#FFF5E6", // Dropdown
              //   },
              // }}
            />

            <Select
              radius={16}
              size="xs"
              label="Choose language"
              placeholder="Choose language"
              onChange={handleByOTT}
              data={sortOptions3}
              style={{
                width: 400,

                backgroundColor:
                  theme.colorScheme === "dark" ? "#0A0E14" : "#F2E2D4",
              }}
            />
          </Group>
        </Box>
        <>
          <SimpleGrid cols={6} spacing={18}>
            {moviesToDisplay.map((movie) => (
              <MovieCard
                id={movie.id}
                type={type}
                key={movie.id}
                title={
                  movie.title && movie.title.length > 0
                    ? movie.title
                    : movie.name
                }
                posterPath={movie.poster_path}
                genres={
                  Array.isArray(movie.genre_ids)
                    ? movie.genre_ids.map((id: number) => movieGenres(id))
                    : []
                }
                rating={movie.vote_average}
                voteAverage={movie.vote_count}
                language={movie.original_language}
                releaseDate={movie.release_date || "unknown"}
                onClick={handleCardClick}
              />
            ))}
          </SimpleGrid>
        </>
      </AppContainer>
    </>
  );
};

export default RenderMovies;
