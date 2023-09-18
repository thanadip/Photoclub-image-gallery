import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex, Text } from "@chakra-ui/react";

function AdminNavbar() {
    return (
      <Box bg="teal" py={4}>
        <Flex px='10%' align="center" justify={'space-between'}>
        <Link to ="/about">
          <Text fontSize="xl" fontWeight="bold">Logo</Text>
        </ Link>
          <Flex>
            <Link to={'/admin'}>
            <Text mx={2}>Home</Text>
            </Link>
            <Link to = '/adminContact'>
            <Text mx={2}>Contact</Text>
            </Link>
            <Link to = '/user-display'>
            <Text mx={2}>Permissions</Text>
            </Link>
            <Link to = '/admin-image'>
            <Text mx={2}>Upload image</Text>
            </Link>
            <Link to = '/admin-folder'>
            <Text mx={2}>Create folder</Text>
            </Link>
            <Link to = '/login'>
            <Text mx={2}>Log-out</Text>
            </Link>
          </Flex>
        </Flex>
      </Box>
    );
}

export default AdminNavbar