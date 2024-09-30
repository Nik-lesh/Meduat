import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Group,
  useMantineTheme,
  Text,
  Image,
  SimpleGrid,
  Textarea,
  Slider,
  Box,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { useParams } from "react-router-dom";
import emojiArray from "./Emoji";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxStore/store";
import axios from "axios";

const Reviewbutton = () => {
  const theme = useMantineTheme();
  const { type, id } = useParams<{ type: string; id: string }>();
  console.log("type and id:", type, id);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const [opened, setOpened] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const preview = file ? (
    <Image
      src={URL.createObjectURL(file)}
      imageProps={{
        onLoad: () => URL.revokeObjectURL(URL.createObjectURL(file)),
      }}
    />
  ) : null;

  // rating
  const getEmoji = (value: number) => emojiArray[value - 1];

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the form while submitting
    setOpened(false);
  };

  // Post review data when submitting
  useEffect(() => {
    if (isSubmitting) {
      const postData = async () => {
        const formData = new FormData();
        if (userInfo?.id) {
          formData.append("user_id", userInfo.id);
        }
        const reviewField =
          type === "restaurant" || type === "hotel" ? "review_text" : "text";

        formData.append(reviewField, review);
        formData.append("rating", String(rating));
        if (file) formData.append("image", file);

        try {
          // Conditionally send different POST requests based on type
          let response;
          if (type === "movie" || type === "tv") {
            // POST request A for movie/TV show
            response = await axios.post(
              `http://localhost:3030/details/${type}/${id}`,

              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          } else if (type === "restaurant" || type === "hotel") {
            // POST request B for restaurant/hotel
            response = await axios.post(
              `http://localhost:3030/${type}/${id}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          }

          console.log("Review posted successfully:", response?.data);
        } catch (error) {
          console.error("Error posting review:", error);
        } finally {
          setIsSubmitting(false); // Re-enable form
        }
      };

      postData();
    }
  }, [isSubmitting, file, review, rating, id, type]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Text
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            sx={{ fontFamily: "Greycliff CF, sans-serif" }}
            fz="xl"
            fw={500}
          >
            Post a review there
          </Text>
        }
        size="xl"
        styles={(theme) => ({
          modal: {
            backgroundColor:
              theme.colorScheme === "dark" ? "#14181E" : "#E8D8CA",
          },
          header: {
            backgroundColor:
              theme.colorScheme === "dark" ? "#14181E" : "#E8D8CA",
          },
          body: {
            backgroundColor:
              theme.colorScheme === "dark" ? "#14181E" : "#E8D8CA",
          },
        })}
      >
        <form onSubmit={handleSubmit}>
          <Textarea
            pb="xl"
            radius="md"
            placeholder="Please write your thoughts here"
            value={review}
            onChange={(e) => setReview(e.currentTarget.value)}
            required
          />
          <Dropzone
            radius="md"
            accept={IMAGE_MIME_TYPE}
            onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}
            multiple={false}
          >
            <Text align="center">Drop a single image here</Text>
          </Dropzone>

          {file && (
            <SimpleGrid cols={1} mt="sm">
              {preview}
            </SimpleGrid>
          )}
          <Box pt="xl">
            <Group>
              <Text size="sm">Rating: {rating}</Text>
              <Text size="xl" role="img" aria-label="emoji">
                {getEmoji(rating)}
              </Text>
            </Group>
            <Slider
              pt="xl"
              value={rating}
              onChange={setRating}
              min={1}
              max={10}
              step={1}
              marks={[{ value: 1 }, { value: 5 }, { value: 10 }]}
              styles={{
                track: { height: 5 },
                thumb: { height: 30, width: 30 },
              }}
              aria-label="rating slider"
            />
          </Box>
          <Group position="right" mt="md" pt="xl">
            <Button
              type="submit"
              variant="light"
              fullWidth
              style={{
                backgroundColor: theme.colorScheme === "dark" ? "" : "#969286",
                color: theme.colorScheme === "dark" ? "" : "white",
                height: "25px",
              }}
              sx={{ fontWeight: 500, fontFamily: "inherit" }}
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? "Submitting..." : "Upload"}
            </Button>
          </Group>
        </form>
      </Modal>

      <Group position="center">
        <Button
          onClick={() => setOpened(true)}
          variant="light"
          style={{
            backgroundColor: theme.colorScheme === "dark" ? "" : "#969286",
            color: theme.colorScheme === "dark" ? "" : "white",
            height: "25px",
            width: "fullwidth",
          }}
          sx={{ fontWeight: 500, fontFamily: "inherit" }}
        >
          Post review
        </Button>
      </Group>
    </>
  );
};

export default Reviewbutton;
