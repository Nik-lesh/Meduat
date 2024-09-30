import {
  Badge,
  Box,
  Card,
  Group,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

interface RestaurantProps {
  id: number;
  image: string;
  name: string;
  price: string;
  timing: string;
  menu: string;
  onClick: (id: number, type: "restaurant" | "hotels") => void;
  type: "restaurant" | "hotels";
}

export const RestrauntCard: React.FC<RestaurantProps> = ({
  id,
  image,
  name,
  price,
  timing,
  menu,
  type,
  onClick,
}) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    onClick(id, type);
    navigate(`/${type}/${id}`);
  };

  return (
    <Card
      shadow="xl"
      padding="xs"
      onClick={handleClick}
      style={{
        backgroundColor: theme.colorScheme === "dark" ? "#14181E" : "#E8D8CA",
        cursor: "pointer",
      }}
    >
      <Card.Section>
        <Image
          pl="xs"
          pb="xs"
          pt="xs"
          pr="xs"
          radius="sm"
          src={image}
          // style={{
          //   height: 300,
          //   width: 200,
          // }}
        />
      </Card.Section>

      <Box mt="md">
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{name}</Text>
        </Group>
        <Text size="sm" mt="md">
          Cuision:{" "}
          <Badge
            color={theme.colorScheme === "dark" ? "blue" : "red"}
            variant="light"
          >
            {" "}
            {menu}
          </Badge>
        </Text>
        <Text size="sm" mt="md">
          Avg for two: ₹{""}
          {price}
        </Text>

        <Text size="sm" mt="md">
          Timing:
          {timing}
        </Text>
      </Box>
    </Card>
  );
};
