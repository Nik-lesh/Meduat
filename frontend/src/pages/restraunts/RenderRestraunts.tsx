import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Group,
  Image,
  Input,
  SegmentedControl,
  Select,
  SimpleGrid,
  useMantineTheme,
} from "@mantine/core";
import { RestrauntCard } from "./assets/CardView";
import { AppContainer } from "../../components/Container";
import { MagnifyingGlass } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxStore/store";

interface Restaurant {
  id: number;
  name: string;
  image: string;
  description: string;
  menu: string;
  timing: string;
  price: string;
  type: "restraunts" | "hotels";
}

function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("restraunts");

  const [type, setType] = useState<"restaurant" | "hotels">("restaurant");
  const theme = useMantineTheme();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3030/${type}`);
        setRestaurants(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchRestaurants();
  }, [type]);

  const handleType = (value: string) => {
    setSelectedCategory(value);

    if (value === "Restraunt") {
      setType("restaurant");
      navigate("/restaurant");
      console.log("type", setType);
    } else if (value === "Hotel") {
      setType("hotels");
      navigate("/hotels");
    }
    setRestaurants([]);
  };
  const handleCardClick = (id: number) => {
    navigate(`/${type}/${id}`);
  };

  return (
    <>
      <AppContainer>
        <Box my={12}>
          <Group position="apart">
            <SegmentedControl
              radius={16}
              size="xs"
              fullWidth
              onChange={handleType}
              data={[
                { label: "Restraunt", value: "Restraunt" },
                { label: "Hotel", value: "Hotel" },
              ]}
              style={{
                width: 400,
                backgroundColor:
                  theme.colorScheme === "dark" ? "#0A0E14" : "#C7B7A3",
                color: "#F2E2D4",
              }}
            />
            <form>
              <Input
                disabled
                size="xs"
                radius={16}
                icon={<MagnifyingGlass size={16} />}
                placeholder="Search..."
                style={{
                  width: 870,
                  backgroundColor:
                    theme.colorScheme === "dark" ? "#0A0E14" : "#F2E2D4",
                }}
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
              disabled
              data={[{ value: "react", label: "React" }]}
              sx={{
                width: 400,
              }}
            />

            <Select
              radius={16}
              size="xs"
              label="Choose one"
              placeholder="Select one"
              disabled
              data={[
                { value: "react", label: "React" },
                { value: "ng", label: "Angular" },
                { value: "svelte", label: "Svelte" },
                { value: "vue", label: "Vue" },
              ]}
              style={{
                width: 400,
              }}
            />

            <Select
              radius={16}
              size="xs"
              disabled
              label="Choose one"
              placeholder="Select one"
              data={[
                { value: "react", label: "React" },
                { value: "ng", label: "Angular" },
                { value: "svelte", label: "Svelte" },
                { value: "vue", label: "Vue" },
              ]}
              style={{
                width: 400,

                backgroundColor:
                  theme.colorScheme === "dark" ? "#0A0E14" : "#F2E2D4",
              }}
            />
          </Group>
        </Box>

        <SimpleGrid cols={6} spacing={18}>
          {restaurants.map((restaurant) => (
            <RestrauntCard
              type={type}
              id={restaurant.id}
              name={restaurant.name}
              image={restaurant.image}
              price={restaurant.price}
              timing={restaurant.timing || " 27/7 checkin"}
              menu={restaurant.menu}
              onClick={() => handleCardClick(restaurant.id)}
            />
          ))}
        </SimpleGrid>
      </AppContainer>
    </>
  );
}

export default RestaurantList;
