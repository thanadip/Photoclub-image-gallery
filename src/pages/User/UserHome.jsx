import React, { useState, useEffect } from 'react';
import UserNavbar from '../../components/UserNavbar';
import axios from 'axios';
import { Flex, List, ListItem, Text, Link, Image } from '@chakra-ui/react';

function UserHome() {

  const [years , setYears] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/get-year')
      .then(response => {
        setYears(response.data);
      })
      .catch(error => {
        console.error('Error fetching years:', error);
      });
  }, []);

  return (
    <>
      <UserNavbar />
      <Flex direction="column" align="center" mt="4">
        <Text fontSize="xl" fontWeight="bold" mb="2">List of Years:</Text>
        <List spacing="2">
          {years.map(year => (
            <ListItem key={year.year_id}>
              <Text>{year.year_name}</Text>
            </ListItem>
          ))}
        </List>
      </Flex>
    </>
  );
}

export default UserHome;
