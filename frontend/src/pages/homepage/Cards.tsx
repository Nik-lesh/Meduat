import React, { useEffect, useState, ReactNode } from "react";
import { useMantineTheme } from "@mantine/core";
import { Card, Text } from "@mantine/core";

interface AnimatedCardProps {
  title: string;
  children: ReactNode; // Accepts any React nodes, such as the icon
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ title, children }) => {
  const [show, setShow] = useState(false);
  const theme = useMantineTheme();

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 20000); // Show card after 20 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card
      className={`card ${show ? "show" : "hidden"}`}
      shadow="sm"
      padding="lg"
      radius="md"
    >
      <div className="card-inner">
        <div
          className="card-front"
          style={{ background: theme.colors.gray[0] }}
        >
          <Text size="lg">{title}</Text>
        </div>
        <div className="card-back" style={{ background: theme.colors.gray[2] }}>
          {children}
        </div>
      </div>
    </Card>
  );
};

export default AnimatedCard;
