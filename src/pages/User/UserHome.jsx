import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Flex, List, ListItem, Text, Image, Card } from '@chakra-ui/react';

import UniversalNav from '../../components/UniversalNav';

function UserHome() {

  const [years , setYears] = useState([]);

  const handleYearClick= (year_name) =>{

    console.log(year_name)
  }
//#2582FE #ABB8EF #E8EFFF #C2A875


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
      <UniversalNav/>
      <Flex direction="column" align="center" mt="4" >
          <Text fontSize="xl" fontWeight="bold" mb="2">List of Years:</Text>
          <List spacing="2">
            {years.map(year => (
              <ListItem key={year.year_id}>
                <Text as={Link} to='/login' onClick={() => handleYearClick(year.year_name)}>{year.year_name}</Text>
              </ListItem>
            ))}
          </List>
        </Flex>
    </>
  );
}

export default UserHome;
