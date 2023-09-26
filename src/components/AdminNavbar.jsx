import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex, Img, Stack, Text } from "@chakra-ui/react";

function UserNavbar() {
  return (
    <Box bg="#2582FE" py={6}>
      <Flex px="5%" align="center" justify="space-between">
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
          <Button as={Link} to={"/index"} bgColor={"#2582FE"} size="md">
            Home
          </Button>
          <Button as={Link} to={"/user-display"} bgColor={"#2582FE"} size="md">
            Permission
          </Button>
          <Button as={Link} to={"/admin-image"} bgColor={"#2582FE"} size="md">
            Upload Image
          </Button>
          <Button as={Link} to={"/admin-folder"} bgColor={"#2582FE"} size="md">
            Create Album
          </Button>
        </Stack>
        <Link to="/login">
          <Button bgColor={"yellow.400"} size="md">
            Log-out
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}

export default UserNavbar;
