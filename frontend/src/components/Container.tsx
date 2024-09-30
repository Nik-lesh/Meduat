import { Container } from "@mantine/core";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export const AppContainer: React.FC<Props> = ({ children }) => {
  return (
    <Container
      className="p-3"
      style={{
        maxWidth: 1400,
        minHeight: 400,
        height: "100%",
        margin: "auto",
      }}
    >
      {children}
    </Container>
  );
};
