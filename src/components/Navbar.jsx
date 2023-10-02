import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex, Img, Stack, Text } from "@chakra-ui/react";

function UserNavbar() {
  return (
    <Box bg="#75bfec" py={3}>
      <Flex px="7%" align="center" justify="space-between">
        <Link to="/index">
          <Text>LOGO</Text>
        </Link>
        <Stack
          spacing={"20"}
          direction="row"
          align="center"
          flex={1}
          justify="center"
        >
          <Button as={Link} to={"/index"} bgColor={"#75bfec"} size="md">
            Home
          </Button>
          <Button as={Link} to={"/about"} bgColor={"#75bfec"} size="md">
            About
          </Button>
          <Button as={Link} to={"/Contact"} bgColor={"#75bfec"} size="md">
            Contact
          </Button>
          <Button as={Link} to={"/Register"} bgColor={"#75bfec"} size="md">
            Register
          </Button>
        </Stack>
        <Link to="/login">
          <Button bgColor={"yellow.400"} size="md">
            Log-in
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}

export default UserNavbar;
