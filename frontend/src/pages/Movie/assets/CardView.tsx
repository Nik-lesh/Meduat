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

interface MovieProps {
  id: number;
  title: string;
  posterPath: string | null;
  genres: string[];
  rating: number;
  voteAverage: number;
  language: string;
  releaseDate: string;
  onClick: (id: number, type: "movie" | "tv") => void;
  type: "movie" | "tv";
}

export const MovieCard: React.FC<MovieProps> = ({
  id,
  title,
  posterPath,
  genres,
  rating,
  voteAverage,
  language,
  releaseDate,
  onClick,
  type,
}) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    onClick(id, type);
    navigate(`/details/${type}/${id}`);
  };
  return (
    <Card
      shadow="xl"
      padding="xs"
      style={{
        backgroundColor: theme.colorScheme === "dark" ? "#14181E" : "#E8D8CA",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Card.Section>
        <Image
          pl="xs"
          pb="xs"
          pt="xs"
          pr="xs"
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          style={{
            borderRadius: 10,
          }}
        />
      </Card.Section>

      <Box mt="md">
        <Text weight={500}>{title}</Text>
        <Group spacing="xs" mt="xs">
          {genres.map((genre) => (
            <Badge
              key={genre}
              color={theme.colorScheme === "dark" ? "blue" : "red"}
              variant="light"
            >
              {genre}
            </Badge>
          ))}
        </Group>
        <Text size="sm" color="dimmed" mt="xs">
          Rating: {rating}/10
        </Text>
        <Text size="sm" color="dimmed" mt="xs">
          Vote Average: {voteAverage}
        </Text>
        <Text size="sm" color="dimmed" mt="xs">
          Language: {language.toUpperCase()}
        </Text>
        <Text size="sm" color="dimmed" mt="xs">
          Release Date: {releaseDate}
        </Text>
      </Box>
    </Card>
  );
};
