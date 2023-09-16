import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Flex, List, ListItem, Text, Image } from '@chakra-ui/react';

function ImageFolder() {
  const [images, setImages] = useState([]);
  const { folderId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5001/get-images/${folderId}`)
      .then(response => {
        setImages(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, [folderId]);

  return (
    <>
      <Navbar />
      <Flex direction="column" align="center" maxH={"200px"} maxW={"200px"} mx={'auto'}>
        <Text fontSize="xl" fontWeight="bold" mb="2">List of Images:</Text>
        <List spacing="2">

          {images.map((image, index) => (
          <ListItem key={index}>
            <Image src={`data:image/png;base64,${image.pic_name}`} alt={`Image ${index}`} />
          </ListItem>
          ))}

        </List>
      </Flex>
    </>
  );
}

export default ImageFolder;
