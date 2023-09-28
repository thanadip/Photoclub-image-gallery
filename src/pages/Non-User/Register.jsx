import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Flex,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  ButtonGroup,
  Img,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import city from "../../assets/city.png";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (
        !username ||
        !password ||
        !confirmPassword ||
        !email ||
        !phoneNumber
      ) {
        await Swal.fire({
          icon: "error",
          title: "Missing field!",
          text: "Missing field please check!",
        });
        return;
      }

      if (password !== confirmPassword) {
        await Swal.fire({
          icon: "error",
          title: "Check password!",
          text: "Password do not match!",
        });
        return;
      }

      const response = await axios.post("http://localhost:5001/register", {
        username,
        user_email: email,
        password,
        phone_number: phoneNumber,
      });

      if (response.status === 201) {
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Registration successful",
        });
        navigate("/login");
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to registration",
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to registration",
      });
    }
  };

  return (
    <Flex h={"100dvh"} justify={"center"} backgroundColor={"#75bfec"}>
      <Flex mr={"auto"}>
        <Stack my={"auto"} mx={"5vw"} pb={"10vw"}>
          <Text fontSize={"6xl"} textAlign={"left"}>
            Create an account
          </Text>
          <Text fontSize={"3xl"} textAlign={"left"}>
            &nbsp;&nbsp;&nbsp;Make your own account!{" "}
          </Text>
        </Stack>
      </Flex>

      <Flex minW={"60vw"} maxW={"60vw"} justifyContent={"center"}>
        <Stack w={"60%"}>
          <Text fontSize={"6xl"} mb={"vh"} mt={"5vh"}>
            Register
          </Text>

          <Card>
            <FormControl padding={"5%"} isRequired>
              <FormLabel fontSize={"2xl"}>Username</FormLabel>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <FormLabel fontSize={"2xl"}>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <FormLabel fontSize={"2xl"}>Confirm password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <FormLabel fontSize={"2xl"}>Email</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <FormLabel fontSize={"2xl"}>Phone number</FormLabel>
              <Input
                type="text"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />

              <ButtonGroup>
                <Button
                  mt={4}
                  bg="#2582FE"
                  color={"white"}
                  size="lg"
                  onClick={handleRegister}
                >
                  Submit
                </Button>

                <Link to="/Index">
                  <Button mt={4} colorScheme="gray" size="lg">
                    <Text color={"gray"}> Cancle </Text>
                  </Button>
                </Link>
              </ButtonGroup>

              <Text mt={"4"} textAlign={"center"}>
                {" "}
                already have an account?{" "}
                <Text
                  textDecoration="underline"
                  color={"#2582FE"}
                  as={Link}
                  to="/login"
                >
                  Log in
                </Text>
              </Text>
            </FormControl>
          </Card>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default Register;
