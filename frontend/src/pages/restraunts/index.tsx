// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Text, Grid, Loader, Center } from "@mantine/core";
// import { RestrauntCard } from "./assets/CardView";

// interface Restaurant {
//   location_id: string;
//   name: string;
//   averageRating: number;
//   establishmentTypeAndCuisineTags: string[];
//   thumbnail: {
//     photo: {
//       photoSizeDynamic: {
//         maxHeight: number;
//         maxWidth: number;
//         urlTemplate: string;
//       };
//     };
//   };
// }

// const RestaurantList: React.FC = () => {
//   const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       const options = {
//         method: "GET",
//         url: "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants",
//         params: {
//           locationId: "304554",
//         },
//         headers: {
//           "x-rapidapi-key":
//             "8ed64cdde7msh70e3904b615072ap19e5cejsn4cb5351ab7c8",
//           "x-rapidapi-host": "tripadvisor16.p.rapidapi.com",
//         },
//       };

//       try {
//         const response = await axios.request(options);
//         console.log("Response:", response.data.data.data);
//         setRestaurants(response.data.data.data);
//       } catch (err) {
//         setError("Error fetching restaurants");
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   if (loading) {
//     return (
//       <Center style={{ height: "100vh" }}>
//         <Loader size="xl" />
//       </Center>
//     );
//   }

//   if (error) return <Text color="red">{error}</Text>;

//   return (
//     <Grid>
//       {restaurants.map((restaurant) => {
//         const urlTemplate =
//           restaurant.thumbnail.photo.photoSizeDynamic.urlTemplate;
//         const imageUrl = urlTemplate
//           .replace("{width}", "300")
//           .replace("{height}", "200");

//         return (
//           <Grid.Col key={restaurant.location_id} sm={6} lg={4}>
//             <RestrauntCard
//               imageUrl={imageUrl}
//               title={restaurant.name}
//               description={restaurant.establishmentTypeAndCuisineTags.join(
//                 ", "
//               )}
//               rating={restaurant.averageRating}
//             />
//           </Grid.Col>
//         );
//       })}
//     </Grid>
//   );
// };

// export default RestaurantList;

import React from "react";

const index = () => {
  return <div>index</div>;
};

export default index;
