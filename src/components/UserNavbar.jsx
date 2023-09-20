import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex, Img, Text } from "@chakra-ui/react";

function UserNavbar() {
    return (
      <Box bg="#2582FE" py={4}>
        <Flex px='10%' align="center" justify={'space-between'}>
        <Link to ="/about">
        <Img src='src\assets\logo.jpg' boxSize={'40px'} borderRadius={'full'}></Img>
        </ Link>
          <Flex>
            <Link to={'/user'}>
            <Text mx={2}>Home</Text>
            </Link>
            <Link to={'/about'}>
            <Text mx={2}>About</Text>
            </Link>
            <Link to = '/userContact'>
            <Text mx={2}>Contact</Text>
            </Link>
            <Link to = '/image-display'>
            <Text mx={2}>Image</Text>
            </Link>
            <Link to = '/login'>
            <Text mx={2}>Log-out</Text>
            </Link>
          </Flex>
        </Flex>
      </Box>
    );
}

export default UserNavbar