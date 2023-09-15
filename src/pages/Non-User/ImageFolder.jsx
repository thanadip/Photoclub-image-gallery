import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { Link, useParams ,useNavigate} from 'react-router-dom';
import { Flex, Box, List, ListItem, Text } from '@chakra-ui/react';

function FolderYears() {
  const [folders, setFolders] = useState([]);
  const { yearId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5001/get-folders/${yearId}`)
      .then(response =>{
        setFolders(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [yearId]);
  

  return (
    <>
      <Navbar />
      <Flex direction="column" align="center">
        <Text fontSize="xl" fontWeight="bold" mb="2">List of Folders:</Text>
        <List spacing="2">
          {folders.map(folder => (
            <ListItem key={folder.folder_id}>
                <Text as={Link}> {folder.folder_name} </Text>
            </ListItem>
          ))}
        </List>
      </Flex>
    </>
  )
}

export default FolderYears;
