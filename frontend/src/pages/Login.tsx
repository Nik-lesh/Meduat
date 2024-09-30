//user ka proper mutation baki h wo badme krna not an asap task but imp task please bhulna mat before production

import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Container,
  Title,
  Text,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMantineTheme } from "@mantine/core";
import { setCredentials } from "../slices/authSlices";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  // Get the page the user was on before redirecting to login
  const redirect = location.state?.from?.pathname || "/home";

  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      identifier: "", // username or email
      password: "",
    },

    validate: {
      identifier: (value) => (value ? null : "Username or Email is required"),
      password: (value) => (value ? null : "Password is required"),
    },
  });

  const handleSubmit = async (values: {
    identifier: string;
    password: string;
  }) => {
    try {
      const response = await axios.post("http://localhost:3030/login", values, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        dispatch(setCredentials(response.data));
        console.log(response.data);
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor:
              theme.colorScheme === "dark" ? "#0A0E14" : "#F2E2D4", // Dynamic background color
            color: theme.colorScheme === "dark" ? "#999999" : "#000000",
            padding: "8px 16px", // Smaller padding to reduce height
            fontSize: "10px",
            minHeight: "40px",
            lineHeight: "1.2",
          },
        });
        navigate(redirect, { replace: true });
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: theme.colorScheme === "dark" ? "#0A0E14" : "#F2E2D4", // Dynamic background color
          color: theme.colorScheme === "dark" ? "#FFFFFF" : "#000000",
        },
      });
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Welcome back!</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Login with your email or username
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Username or Email"
            placeholder="Enter your username or email"
            {...form.getInputProps("identifier")}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            mt="md"
            {...form.getInputProps("password")}
            required
          />
          <Group position="apart" mt="lg">
            <Button type="submit">Login</Button>
          </Group>
        </form>
        <Text pt="sm" size="xs">
          Accont not created?
        </Text>
        <Text
          size="xs"
          color="blue"
          underline
          onClick={() => {
            navigate("/register");
          }}
        >
          To register click here
        </Text>
      </Paper>

      {/* Toast Container */}
      <ToastContainer />
    </Container>
  );
};

export default LoginForm;
