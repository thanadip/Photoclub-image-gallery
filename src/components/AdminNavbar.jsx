import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex, Img, Stack, Text } from "@chakra-ui/react";

function UserNavbar() {
  return (
    <Box bg="#75bfec" py={4}>
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
          <Button as={Link} to={"/user-display"} bgColor={"#75bfec"} size="md">
            Permission
          </Button>
          <Button as={Link} to={"/admin-image"} bgColor={"#75bfec"} size="md">
            Upload Image
          </Button>
          <Button as={Link} to={"/admin-folder"} bgColor={"#75bfec"} size="md">
            Create Album
          </Button>
          <Button as={Link} to={"/admin-approve"} bgColor={"#75bfec"} size="md">
            Approve folder
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
