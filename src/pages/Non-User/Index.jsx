import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';
import { Flex, List, ListItem, Text } from '@chakra-ui/react';

function UserHome() {

  const [years , setYears] = useState([]);
  const navigate = useNavigate();

  const handleYearClick = async (year_id) =>{
    try {
    
      const response = await fetch(`http://localhost:5001/get-folders/${year_id}`);
      const data = await response.json();
      console.log('OK',data)
      navigate(`/images/${year_id}`);
      // console.log(year_id) 
    } catch (error) {
      console.log('An error occurred: ', error)
    }
  }

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
      <Navbar />
      <Flex direction="column" align="center" mt="4">
        <Text fontSize="xl" fontWeight="bold" mb="2">List of Years:</Text>
        <List spacing="2">
          {years.map(year => (
            <ListItem key={year.year_id}>
              <Text as={Link} onClick={() => handleYearClick(year.year_id)} >{year.year_name}</Text>
            </ListItem>
          ))}
        </List>
      </Flex>
    </>
  );
}

export default UserHome;
