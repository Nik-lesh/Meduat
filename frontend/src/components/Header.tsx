import React, { useState } from "react";
import {
  AppShell,
  Header,
  ColorSchemeProvider,
  ColorScheme,
  ActionIcon,
  MantineProvider,
  Footer,
  Badge,
  Avatar,
  Text,
  Box,
  Group,
  Menu,
} from "@mantine/core";
import LOGO2 from "../assets/LOGO2.png";
import LOGO1 from "../assets/LOGO1.png";
import {
  Sun,
  MoonStars,
  SignOut,
  FilmSlate,
  ForkKnife,
  Cursor,
} from "phosphor-react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlices";

type Props = {
  children: React.ReactNode;
};

export const AppShellContainer: React.FC<Props> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  console.log(userInfo);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const dark = colorScheme === "dark";
  const text =
    colorScheme === "dark" ? "Change to light mode" : "change to dark mode";
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          padding="xs"
          header={
            <Header
              height={60}
              pl={50}
              pr={50}
              p="md"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: colorScheme === "dark" ? "#182B31" : "#806350",
              }}
            >
              <img
                onClick={() => {
                  navigate("/home");
                }}
                style={{
                  cursor: "pointer",
                }}
                src={colorScheme === "dark" ? LOGO1 : LOGO2}
                height={40}
                width={120}
                alt="logo"
                className="App-logo"
              />
              <Group spacing={50}>
                <ForkKnife
                  onClick={() => {
                    navigate("/restaurant");
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                  size={28}
                  color="#fafafa"
                  weight="thin"
                />
                <FilmSlate
                  onClick={() => {
                    navigate("/movies");
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                  size={28}
                  color="#fafafa"
                  weight="thin"
                />
                <Menu
                  shadow="md"
                  trigger="hover"
                  openDelay={100}
                  closeDelay={400}
                  position="bottom-end"
                  offset={2}
                  withArrow
                  styles={{}}
                >
                  <Menu.Target>
                    <Badge
                      radius="md"
                      style={{
                        overflow: "hidden",
                      }}
                      sx={{
                        backgroundColor: "white", // Set badge background color
                        color: "black", // Set badge text color
                        padding: "8px",
                      }}
                    >
                      <Group spacing={2}>
                        <Avatar
                          size={15}
                          radius="sm"
                          src={userInfo?.profile_picture}
                          alt="User Avatar"
                        />

                        <Text size={8} sx={{ color: "black" }}>
                          {userInfo?.first_name}
                        </Text>
                        <Text size={8} sx={{ color: "black" }}>
                          {userInfo?.last_name}
                        </Text>
                      </Group>
                    </Badge>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item onClick={() => toggleColorScheme()}>
                      <Group spacing="xs">
                        <ActionIcon
                          size="sm"
                          variant="outline"
                          color={dark ? "white" : "blue"}
                          onClick={() => toggleColorScheme()}
                          title="theme"
                        >
                          {dark ? (
                            <Sun size="1rem" />
                          ) : (
                            <MoonStars size="1rem" />
                          )}
                        </ActionIcon>
                        <Text>{text}</Text>
                      </Group>
                    </Menu.Item>
                    <Menu.Item
                      color="red"
                      onClick={handleLogout}
                      icon={<SignOut size={20} weight="thin" />}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Header>
          }
          footer={
            <Footer
              height={50}
              p="xs"
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: dark ? "#182B31" : "#806350",
                zIndex: 1000, // Ensure footer is above other content
              }}
            >
              <span style={{ color: dark ? "white" : "black" }}>
                © 2024. All rights reserved.
              </span>
            </Footer>
          }
          styles={{
            main: {
              paddingBottom: 50, // Ensure content is not hidden behind footer
              minHeight: "100vh", // Full viewport height
              backgroundColor: colorScheme === "dark" ? "#0A0E14" : "#F2E2D4",
            },
          }}
        >
          {children}
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
