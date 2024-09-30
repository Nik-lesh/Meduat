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

interface User {
  id: number;
  profile_picture: string | null; // Nullable profile picture
  username: string;
}

interface Review {
  tvshow_id?: number;
  movie_id?: number;
  user_id: number;
  text: string;
  image: string | null;
  video: string | null;
  likes: number[]; // Array of user IDs who liked the review
  comments: Comment[];
  shares: number;
  rating: number;
  user: User;
  filled: boolean;
  onClick: (id: number) => void;
  createdAt: string; // ISO date string
}

interface Comment {
  user_id: number;
  text: string;
  likes: number[]; // Array of user IDs who liked the comment
  replies: Reply[];
  createdAt: string; // ISO date string
}

interface Reply {
  user_id: number;
  text: string;
  likes: number[]; // Array of user IDs who liked the reply
  createdAt: string; // ISO date string
}

export const ReviewCard: React.FC<Review> = ({
  // tvshow_id,
  // movie_id,
  // user_id,
  text,
  image,
  // video,
  likes,
  filled,
  comments,
  shares,
  rating,
  // onClick,
  user,
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
        {/* Conditional rendering for image, video, or text */}
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
              <Text>{text}</Text>
              <Group spacing="xl">
                <Group spacing="xs">
                  {/* <Heart size={16} color="#fafafa" weight="thin" /> */}
                  <HeartIcon
                    initialCount={likes.length}
                    initialIsFilled={filled}
                  />
                </Group>

                <Group spacing="xs">
                  <ChatTeardrop size={16} color="#fafafa" weight="thin" />
                  <Text size="xs">{comments.length}</Text>
                </Group>
                <Group spacing="xs">
                  <FadersHorizontal size={16} color="#fafafa" weight="thin" />
                  <Text size="xs">{rating}</Text>
                </Group>
                <Group spacing="xs">
                  <Share size={16} color="#fafafa" weight="thin" />
                  <Text size="xs">{shares}</Text>
                </Group>
              </Group>

              <Divider size="xs" />
              <Group color="fafafa" spacing={10}>
                <Avatar
                  size={15}
                  src={user.profile_picture}
                  alt="no image here"
                  radius="xl"
                />
                <Text size="sm" c="dimmed">
                  {user.username}
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
            {text}
          </Text>
        )}
      </CardSection>
      <Text size={8} w={100}>
        /{user.username}
      </Text>
    </Card>
  );
};
