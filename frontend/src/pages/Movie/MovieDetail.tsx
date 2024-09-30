import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetails } from "./assets/routes";
import { AppContainer } from "../../components/Container";
import {
  Badge,
  Box,
  Card,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Loader,
  Paper,
  ScrollArea,
  SimpleGrid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { ReviewCard } from "./reviews/CardView";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxStore/store";
import Reviewbutton from "../../components/ReviewButton/Button";

const MovieDetail = () => {
  const location = useLocation();
  const { details } = location.state || {};
  console.log(location);
  const pathParts = location.pathname.split("/");
  const type = pathParts[2];
  const id = pathParts[3];
  const theme = useMantineTheme();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const [reviews, setReviws] = useState<any[]>([]);
  const [likes, setLikes] = useState<boolean>(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3030/details/${type}/${id}`
        );

        setReviws(data);
      } catch (error) {
        setReviws([]); // review set to an empty
        console.error("Error fetching reviews:", error);
      }
    };
    // setLikes(data.likes.includes(userInfo?.id ? true : false));
    fetchReviews();
  }, [id, type]);

  const dividerColor =
    theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.dark[0];

  if (!details) {
    return <Loader />;
  }

  return (
    <AppContainer>
      <Card
        shadow="xl"
        padding="xs"
        style={{
          backgroundColor: theme.colorScheme === "dark" ? "#14181E" : "#E8D8CA",
        }}
      >
        <Grid>
          <Grid.Col pr="sm" pl="sm" pt="sm" pb="sm" span={4}>
            <Paper shadow="xl">
              <Image
                src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                alt={details.title}
                radius="md"
                style={{ width: "100%" }}
              />
            </Paper>
          </Grid.Col>
          <Grid.Col pl="xl" span={8}>
            <Group pr="xl" position="apart">
              <Text size="xl" weight={700}>
                {details.title && details.title.length > 0
                  ? details.title
                  : details.name}
              </Text>
              <Reviewbutton />
            </Group>
            <Text size="sm" color="dimmed">
              Language: {details.original_language.toUpperCase()}
            </Text>
            <Text size="sm" color="dimmed">
              Budget: {details.budget}
            </Text>
            <Text size="sm" color="dimmed">
              Runtime: {details.runtime} minutes
            </Text>
            <Text size="sm" color="dimmed">
              Rating: {details.vote_average}/10
            </Text>{" "}
            <Text size="sm" color="dimmed">
              Total Collection: {details.revenue}
            </Text>
            <Text size="sm" color="dimmed">
              Release Date: {details.release_date}
            </Text>
            <Divider my="sm" color={dividerColor} />
            <Text size="md" weight={500}>
              Genres:
            </Text>
            <Box>
              {details.genres.map((genre: any) => (
                <Badge
                  key={genre.name}
                  color={theme.colorScheme === "dark" ? "blue" : "red"}
                  variant="light"
                  mr="xs"
                >
                  {genre.name}
                </Badge>
              ))}
            </Box>
            <Divider my="sm" color={dividerColor} />
            <Text size="md" weight={500}>
              Overview:{" "}
            </Text>
            <Text size="sm">{details.overview}</Text>
            <Divider my="sm" color={dividerColor} />
            <Text size="md" weight={500}>
              Production house:
            </Text>
            <Flex gap="md" align="center">
              {details.production_companies.map(
                (company: any, index: number) =>
                  company.logo_path && (
                    <Group key={index}>
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        style={{ width: "100px", height: "auto" }}
                      />
                    </Group>
                  )
              )}
            </Flex>
          </Grid.Col>
        </Grid>
        <Divider my="sm" color={dividerColor} />

        <Text size="md" weight={500}>
          Cast:
        </Text>
        <ScrollArea style={{ width: "100%", whiteSpace: "nowrap" }}>
          <Flex gap="md" style={{ overflowX: "auto", padding: "1rem" }}>
            {details.cast.map(
              (actor: any) =>
                actor.profile_path && (
                  <Card
                    key={actor.id}
                    radius="md"
                    shadow="xl"
                    padding="xs"
                    style={{
                      backgroundColor:
                        theme.colorScheme === "dark" ? "#14181E" : "#E8D8CA",
                      cursor: "pointer",
                      width: "120px",
                      height: "240px",
                    }}
                  >
                    <Card.Section>
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                        alt={actor.name}
                        radius="md"
                      />
                    </Card.Section>
                    <Box style={{ padding: "0.5rem 0", textAlign: "center" }}>
                      <Text size="sm" color="dimmed">
                        {actor.name}
                      </Text>
                      <Text size="xs" color="dimmed">
                        {actor.character}
                      </Text>
                    </Box>
                  </Card>
                )
            )}
          </Flex>
        </ScrollArea>
        <Divider my="sm" color={dividerColor} />
        <Group pr="xl" position="apart">
          <Text pl="xl" size="md" weight={500}>
            REVIEWS:
          </Text>
          <Reviewbutton />
        </Group>
        <SimpleGrid cols={5} spacing={18}>
          {reviews.map((review) => (
            <ReviewCard
              key={review._id} // Or any unique identifier, such as review._id
              tvshow_id={review.tvshow_id}
              movie_id={review.movie_id}
              user_id={review.user_id}
              text={review.text}
              image={review.image}
              video={review.video}
              likes={review.likes}
              comments={review.comments}
              shares={review.shares}
              rating={review.rating}
              filled={likes}
              onClick={(id) => console.log("Clicked review", id)}
              createdAt={""}
              user={review.user}
            />
          ))}
        </SimpleGrid>
      </Card>
    </AppContainer>
  );
};

export default MovieDetail;
