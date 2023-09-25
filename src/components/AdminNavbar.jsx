import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Img, Text } from "@chakra-ui/react";

function AdminNavbar() {
  return (
    <Box bg="#2582FE" py={4}>
      <Flex px="10%" align="center" justify={"space-between"}>
        <Link to="/about">
          {/* <Img src='src\assets\logo.jpg' boxSize={'40px'} borderRadius={'full'}></Img> */}
          <Text> LOGO</Text>
        </Link>
        <Flex>
          <Link to={"/admin"}>
            <Text mx={2}>Home</Text>
          </Link>
          <Link to="/adminContact">
            <Text mx={2}>Contact</Text>
          </Link>
          <Link to="/user-display">
            <Text mx={2}>Permissions</Text>
          </Link>
          <Link to="/admin-image">
            <Text mx={2}>Upload Image</Text>
          </Link>
          <Link to="/admin-folder">
            <Text mx={2}>Create Album</Text>
          </Link>
          <Link to="/login">
            <Text mx={2}>Log-out</Text>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default AdminNavbar;
