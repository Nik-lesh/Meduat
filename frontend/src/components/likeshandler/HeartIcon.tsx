import React, { Children, useState } from "react";
import { Heart } from "phosphor-react";
import "./Heart.css";
import { Group, Text } from "@mantine/core";
import { useHeart } from "./useHrart"; // Import your custom hook

// this would be used as a hook
function HeartIcon({ initialCount = 0, initialIsFilled = false }) {
  const { isFilled, count, handleClick } = useHeart(
    initialCount,
    initialIsFilled
  );

  return (
    <Group spacing="xs">
      <Heart
        size={24}
        color={isFilled ? "red" : "white"} // Change color from transparent to red
        weight={isFilled ? "fill" : "thin"}
        onClick={handleClick}
        className={`heart-icon ${isFilled ? "beat" : ""}`} // Add the beat class on click
        style={{
          color: isFilled ? "red" : "transparent", // Fill color when heart is filled
          stroke: isFilled ? "none" : "white", // Stroke color when not filled
          strokeWidth: "2px", // White stroke for the heart outline
          backgroundColor: "transparent", // Transparent background
        }}
      />
      <Text>{count}</Text> {/* Display the count here */}
    </Group>
  );
}

export default HeartIcon;
