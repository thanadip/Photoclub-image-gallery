import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Card, Stack, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react';

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (userId) => {
    fetch(`http://localhost:5001/users/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // If the deletion was successful, update the users state by removing the deleted user
          setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId));

        } else if (response.status === 404) {

          console.error('User not found');

        } else {

          console.error('Failed to delete user');
          
        }
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  const handlePromote = (userId) => {
    // Implement promote functionality here based on the userId
    console.log(`Promoting user with ID: ${userId}`);
  };

  const handleDemote = (userId) => {
    // Implement demote functionality here based on the userId
    console.log(`Demoting user with ID: ${userId}`);
  };

  const handleBan = (userId) =>{
    alert(`User : ${userId} was banned!`);
  }

  return (
    <>
      <Text fontSize={'4xl'}>Edit user permissions</Text>
      <TableContainer>
        <Table variant={'striped'} colorScheme='teal'>
          <Thead border={'2px'}>
            <Tr>
              <Th maxW={'2vw'}>User ID</Th>
              <Th>Username</Th>
              <Th>User email</Th>
              <Th maxW={'5vw'}>User phone</Th>
              <Th maxW={'2vw'}>User type</Th>
              <Th>Created at</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody border={'2px'}>
            {users.map((user) => (
              <Tr key={user.user_id}>
                <Td>{user.user_id}</Td>
                <Td>{user.username}</Td>
                <Td>{user.user_email}</Td>
                <Td>{user.user_phone}</Td>
                <Td>{user.user_type_id}</Td>
                <Td>{user.created_at}</Td>
                <Td>
                  <Button colorScheme="green" mr={2} onClick={() => handlePromote(user.user_id)}>
                    Promote
                  </Button>
                  <Button colorScheme="blue" mr={2} onClick={() => handleDemote(user.user_id)}>
                    Demote
                  </Button>
                  <Button colorScheme="red" mr={2} onClick={() => handleDelete(user.user_id)}>
                    Delete
                  </Button>
                  <Button colorScheme="blackAlpha" color={'white'} mr={2} onClick={() => handleBan(user.user_id)}>
                    Ban
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AdminUsers;
