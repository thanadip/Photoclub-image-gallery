import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import {
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove("userRole");
    Cookies.remove("userId");
    Cookies.remove("username");
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/login", {
        username,
        password,
      });

      const userType = response.data.user_type_id;
      const userId = response.data.id;

      if (userType === 1 || userType === 2 || userType === 3) {
        Cookies.set("userRole", userType);
        Cookies.set("userId", userId);
        Cookies.set("username", username);
      }

      if (response.status === 200) {
        if (userType === 1) {
          navigate("/Index");
        } else if (userType === 2 || userType === 3) {
          navigate("/admin");
        } else if (userType === 0) {
          navigate("/blocked");
        } else {
          navigate("/*");
        }

        await Swal.fire({
          position: "center",
          icon: "success",
          title: "login successfully",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to login :(",
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Wrong username or password",
      });
    }
  };

  return (
    <Flex h={"100vh"} justifyContent={"center"} bg={"black"}>
      <Card my={"auto"} justify={"center"} padding={"2.5vw"}>
        <Flex flexDirection={"column"}>
          <Text textAlign={"center"} fontSize={"2xl"}>
            Login
          </Text>
          <form onSubmit={handleFormSubmit}>
            <FormControl padding={"1vw"} isRequired>
              <FormLabel padding={"0.5vh"}>Username</FormLabel>
              <Input
                placeholder="Username"
                marginBottom={"1vw"}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Flex justifyContent={"center"} mt={"4"} flexDirection={"column"}>
                <Button colorScheme="teal" size="md" type="submit">
                  Login
                </Button>

                <Text fontSize={"1xl"} textAlign={"center"} mt={2}>
                  Don't have an account?{" "}
                  <Text
                    color={"teal.500"}
                    textDecoration={"underline"}
                    as={Link}
                    to="/register"
                  >
                    Register now
                  </Text>
                </Text>
                <Text
                  color={"gray.500"}
                  textDecoration={"underline"}
                  textAlign={"center"}
                  as={Link}
                  to="/index"
                >
                  Back to Home
                </Text>
              </Flex>
            </FormControl>
          </form>
        </Flex>
      </Card>
    </Flex>
  );
}

export default Login;
