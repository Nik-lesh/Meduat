//structure
//1. review card view (this would be exported to follow the grid structreon the moviedetail page)
//2. on click on step one this review card detail view would open a new pop up on the screen it would follow the same structure as pintrest and comments and there reply

import {
  Avatar,
  Badge,
  Box,
  Card,
  CardSection,
  Divider,
  Group,
  Image,
  Rating,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import "./styles.css";

import React from "react";
import { ChatTeardrop, FadersHorizontal, Share } from "phosphor-react";
import HeartIcon from "../../../components/likeshandler/HeartIcon";

interface Review {
  image: string;
  profile_picture: string;
  username: string;
  rating: number;
  review_text: string;
}

export const ReviewCard: React.FC<Review> = ({
  image,
  profile_picture,
  username,
  rating,
  review_text,
}) => {
  const theme = useMantineTheme();

  return (
    <Card
      shadow="xl"
      padding="l"
      className="card"
      style={{
        backgroundColor: theme.colorScheme === "dark" ? "#14181E" : "#E8D8CA",
      }}
    >
      <CardSection>
        {image ? (
          <Box
            style={{
              position: "relative",
              width: "100%",
              margin: "8px", // Margin around the image
              overflow: "hidden",
              borderRadius: 10,
            }}
          >
            <Image
              src={image}
              style={{
                width: "100%",
                height: "auto", // Let the height adjust based on width
                borderRadius: 10,
              }}
            />

            <Stack
              align="flex-start"
              justify="flex-end"
              spacing="md"
              className="overlay-content"
            >
              <Text>{review_text}</Text>
              <Group spacing="xl">
                <Group spacing="xs">
                  <HeartIcon initialCount={0} initialIsFilled={false} />
                </Group>

                <Group spacing="xs">
                  <ChatTeardrop size={16} color="#fafafa" weight="thin" />
                  <Text size="xs">0</Text>
                </Group>
                <Group spacing="xs">
                  <FadersHorizontal size={16} color="#fafafa" weight="thin" />
                  <Text size="xs">{rating}</Text>
                </Group>
                <Group spacing="xs">
                  <Share size={16} color="#fafafa" weight="thin" />
                  <Text size="xs">{0}</Text>
                </Group>
              </Group>

              <Divider size="xs" />
              <Group color="fafafa" spacing={10}>
                <Avatar
                  size={15}
                  src={profile_picture}
                  alt="no image here"
                  radius="xl"
                />
                <Text size="sm" c="dimmed">
                  {username}
                </Text>
              </Group>
            </Stack>
          </Box>
        ) : (
          <Text
            pl="xs"
            pb="xs"
            pt="xs"
            pr="xs"
            style={{
              padding: "16px",
            }}
          >
            {review_text}
          </Text>
        )}
      </CardSection>
      <Text size={8} w={100}>
        /{username}
      </Text>
    </Card>
  );
};
