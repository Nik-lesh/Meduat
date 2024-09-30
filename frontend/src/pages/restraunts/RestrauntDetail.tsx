import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ReviewCard } from "./assets/ReviewCard";

import {
  Box,
  Image,
  Text,
  Group,
  Card,
  Grid,
  Paper,
  useMantineTheme,
  Divider,
  SimpleGrid,
} from "@mantine/core";
import { AppContainer } from "../../components/Container";
import Reviewbutton from "../../components/ReviewButton/Button";

interface Review {
  image: string;
  profile_picture: string;
  username: string;
  rating: number;
  review_text: string;
}

interface Entity {
  id: number;
  name: string;
  image: string;
  description: string;
  menu?: string;
  timing?: string;
  price?: string;
  type: "restaurant" | "hotel";
  address: string;
  reviews: Review[];
}

const RestaurantDetail: React.FC = () => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const [entity, setEntity] = useState<Entity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useMantineTheme();

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/${type}/${id}`);
        setEntity(response.data);
      } catch (err) {
        setError("Error fetching entity details.");
      } finally {
        setLoading(false);
      }
    };

    if (type === "restaurant" || type === "hotel") {
      fetchEntity();
    } else {
      setError("Invalid type provided.");
      setLoading(false);
    }
  }, [id, type]);

  const dividerColor =
    theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.dark[0];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <AppContainer>
      <Card
        shadow="xl"
        padding="xs"
        style={{
          backgroundColor: theme.colorScheme === "dark" ? "#14181E" : "#E8D8CA",
        }}
      >
        {entity && (
          <Grid>
            <Grid.Col pr="sm" pl="sm" pt="sm" pb="sm" span={4}>
              <Paper shadow="xl">
                <Image
                  src={entity.image}
                  radius="md"
                  style={{ width: "100%" }}
                />
              </Paper>
            </Grid.Col>
            <Grid.Col pl="xl" span={8}>
              <Group pr="xl" position="apart">
                <Text pt="xl" size="xl" weight={700}>
                  {entity.name}
                </Text>
                <Reviewbutton />
              </Group>
              <Text size="sm" pt="xs" color="dimmed">
                Located at: {entity.address}
              </Text>

              <Text pt="xs" size="sm" color="dimmed">
                Average Price for two: ₹{entity.price}
              </Text>

              <Text pt="xs" size="sm" color="dimmed">
                Cuisine: {entity.menu}
              </Text>

              <Text pt="xs" size="sm" color="dimmed">
                Timing: {entity.timing}
              </Text>

              <Divider my="sm" color={dividerColor} />

              <Text size="sm" color="dimmed">
                Description:
              </Text>
              <Text size="sm" color="dimmed">
                {entity.description}
              </Text>
            </Grid.Col>

            <Grid.Col pr="sm" pl="sm" pt="sm" pb="sm" span={12}>
              <Divider my="sm" color={dividerColor} />

              <Group pr="xl" position="apart">
                <Text pl="xl" size="md" weight={500}>
                  REVIEWS:
                </Text>
                <Reviewbutton />
              </Group>
              <SimpleGrid cols={5} spacing={18}>
                {entity.reviews.length > 0 ? (
                  entity.reviews.map((review, index) => (
                    <ReviewCard
                      key={index}
                      image={review.image}
                      profile_picture={review.profile_picture}
                      username={review.username}
                      rating={review.rating}
                      review_text={review.review_text}
                    />
                  ))
                ) : (
                  <Text>No reviews available</Text>
                )}
              </SimpleGrid>
            </Grid.Col>
          </Grid>
        )}
      </Card>
    </AppContainer>
  );
};

export default RestaurantDetail;
