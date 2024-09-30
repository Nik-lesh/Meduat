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
  Select,
  useMantineTheme,
} from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegistrationForm = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    email_id: "",
    gender: "",
    date_of_birth: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormValues({ ...formValues, gender: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      await axios.post("/register", formValues);
      setIsRegistered(true);
      setErrorMessage(null);
      navigate("/login");
      toast.success("Register successful!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: theme.colorScheme === "dark" ? "#0A0E14" : "#F2E2D4", // Dynamic background color
          color: theme.colorScheme === "dark" ? "#999999" : "#000000",
          padding: "8px 16px", // Smaller padding to reduce height
          fontSize: "10px",
          minHeight: "40px",
          lineHeight: "1.2",
        },
      });
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage("Registration failed. Please try again.");
      toast.error(" Registration failed. Please try again.", {
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
      <Title align="center">Create an account</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Register with your details
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Username"
            placeholder="Enter your username"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
            required
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            mt="md"
            required
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleInputChange}
            mt="md"
            required
          />

          <TextInput
            label="First Name"
            placeholder="Enter your first name"
            name="first_name"
            value={formValues.first_name}
            onChange={handleInputChange}
            mt="md"
            required
          />

          <TextInput
            label="Last Name"
            placeholder="Enter your last name"
            name="last_name"
            value={formValues.last_name}
            onChange={handleInputChange}
            mt="md"
            required
          />

          <TextInput
            label="Email"
            placeholder="Enter your email"
            name="email_id"
            value={formValues.email_id}
            onChange={handleInputChange}
            mt="md"
            required
          />

          <Select
            label="Gender"
            placeholder="Select your gender"
            data={["Male", "Female", "Other"]}
            value={formValues.gender}
            onChange={handleSelectChange}
            mt="md"
            required
          />

          <TextInput
            label="Date of Birth"
            placeholder="YYYY-MM-DD"
            name="date_of_birth"
            value={formValues.date_of_birth}
            onChange={handleInputChange}
            mt="md"
            required
          />

          {errorMessage && (
            <Text color="red" size="sm" align="center" mt={10}>
              {errorMessage}
            </Text>
          )}

          <Group position="apart" mt="lg">
            <Button type="submit">Register</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default RegistrationForm;
