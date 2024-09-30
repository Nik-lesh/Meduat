import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxStore/store";
import { AppContainer } from "../../components/Container";
import {
  Box,
  Card,
  Container,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import "./home.css";
import AnimatedCard from "./Cards";
import { CookingPot, FilmSlate, ForkKnife, VideoCamera } from "phosphor-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  useEffect(() => {
    const handleAnimationEnd = (lineClass: string) => {
      const line = document.querySelector(lineClass);
      if (line) {
        line.classList.add("done");
      }
    };

    const lines = [
      ".line-1",
      ".line-2",
      ".line-3",
      ".line-4",
      ".line-5",
      ".line-6",
      ".line-7",
      ".line-8",
      ".line-9",
      ".line-10",
      ".line-11",
      ".line-12",
    ];

    lines.forEach((lineClass) => {
      const line = document.querySelector(lineClass);
      line?.addEventListener("animationend", () =>
        handleAnimationEnd(lineClass)
      );
    });

    // Timeout to allow layout to stabilize before showing icons
    const timeoutId = setTimeout(() => {
      document.querySelector(".delayed-display")?.classList.add("show-icons");
    }, 24000); // Delay the icons display after the text animation

    return () => {
      lines.forEach((lineClass) => {
        const line = document.querySelector(lineClass);
        line?.removeEventListener("animationend", () =>
          handleAnimationEnd(lineClass)
        );
      });

      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Container size="xs" px="xs">
      <Text className="typewriter line-1">
        Welcome! (prototype version 1.0.0)
      </Text>
      <Text className="typewriter line-2">Hi {userInfo?.first_name},</Text>
      <Text className="typewriter line-3">
        I would like to give you a brife about this application.
      </Text>
      <Text className="typewriter line-4">
        This application aims to give user the exprence of a..
      </Text>
      <Text className="typewriter line-5">
        social media platform like instagram and yelp both in..
      </Text>
      <Text className="typewriter line-6">
        together. This is a prototype model which has a complete
      </Text>
      <Text className="typewriter line-7">
        working model of movies and tv show section, along with a
      </Text>
      <Text className="typewriter line-8">
        small working example of restraunt and hotels.
      </Text>
      <Text className="typewriter line-9">
        Please follow the cards below to visit the page.
      </Text>

      <div className="typewriter line-10">Please give your feedback.</div>
      <div className="typewriter line-11">Happy Exploring!!!! Medha manuja</div>
      <Group
        pt={70}
        spacing={100}
        position="center"
        className="delayed-display" // Apply the CSS class
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => {
            navigate("/restaurant");
          }}
        >
          <ForkKnife style={{}} size={50} weight="thin" />
          <Text size="sm" td="underline" color="blue">
            Food and more
          </Text>
        </div>

        <div
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => {
            navigate("/movies");
          }}
        >
          <FilmSlate
            onClick={() => {
              navigate("/movies");
            }}
            style={{
              cursor: "pointer",
            }}
            size={50}
            weight="thin"
          />
          <Text size="sm" td="underline" color="blue">
            Entertainment
          </Text>
        </div>
      </Group>
    </Container>
  );
};

export default HomePage;
