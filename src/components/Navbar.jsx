import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex, Img, Text } from "@chakra-ui/react";

function Navbar() {
    return (
      <Box bg="#2582FE" py={4}>
        <Flex px='10%' align="center" justify={'space-between'}>
        <Link to ="/index">
          {/* <Img src='src\assets\logo.jpg' boxSize={'40px'} borderRadius={'full'}></Img> */}
        <Text> LOGO</Text>
        </ Link>
          <Flex>
            <Link to={'/index'}>
            <Text mx={2}>Home</Text>
            </Link>
            <Link to={'/about'}>
            <Text mx={2}>About</Text>
            </Link>
            <Link to='/register'>
            <Text mx={2}>Register</Text>
            </Link>
            <Link to = '/contact'>
            <Text mx={2}>Contact</Text>
            </Link>
            <Link to = '/login'>
            <Text mx={2}>Log-in</Text>
            </Link>
          </Flex>
        </Flex>
      </Box>
    );
}

export default Navbar