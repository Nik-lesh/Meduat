// import React, { useState } from "react";
// import { SimpleGrid, Loader, Center, TextInput } from "@mantine/core";
// import { getTopRatedMovies } from "./assets/routes";
// import { MovieCard } from "./assets/CardView";
// import { movieGenres } from "./assets/genre";
// import useFetchData from "../../components/Hook";
// import axios from "axios";
// import { MagnifyingGlass } from "phosphor-react";

// const API_KEY = "efb0980b8b42689d1f254943fc972f43";
// const baseURL = "https://api.themoviedb.org/3";

// const Search = () => {
//   const [fetchmovies, setFetchMovies] = useState(() => getTopRatedMovies);
//   const { data: movies, loading } = useFetchData(fetchmovies);
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<any[]>([]);

//   const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (query.trim() === "") return;

//     try {
//       const response = await axios.get(`${baseURL}/search/movie`, {
//         params: {
//           api_key: API_KEY,
//           query: query,
//         },
//       });
//       setResults(response.data.results);
//       setFetchMovies(() => () => response.data.results);
//     } catch (error) {
//       console.error("Error fetching data from TMDb", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSearch}>
//         <TextInput
//           radius="xl"
//           value={query}
//           icon={<MagnifyingGlass size={16} />}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search for a movie..."
//           style={{
//             width: 870,
//           }}
//         />
//       </form>

//       {loading ? (
//         <Center>
//           <Loader />
//         </Center>
//       ) : (
//         <SimpleGrid cols={4} spacing="xl">
//           {results.map((movie) => (
//             <MovieCard
//               key={movie.id}
//               title={movie.title}
//               posterPath={movie.poster_path}
//               genres={movie.genre_ids.map((id: number) => movieGenres(id))}
//               rating={movie.vote_average}
//               voteAverage={movie.vote_count}
//               language={movie.original_language}
//               releaseDate={movie.release_date || "unknown"}
//             />
//           ))}
//         </SimpleGrid>
//       )}
//     </div>
//   );
// };

// export default Search;
import React from "react";

export const search = () => {
  return <div>search</div>;
};
