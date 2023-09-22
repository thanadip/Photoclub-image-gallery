import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Flex, Text, Box, Wrap, WrapItem, Image } from '@chakra-ui/react';

function FolderYears() {
  const [folders, setFolders] = useState([]);
  const { yearId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/get-folders/${yearId}`)
      .then((response) => {
        setFolders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [yearId]);

  useEffect(() => {
    folders.forEach((folder) => {
      axios
        .get(`http://localhost:5001/get-thumbnail/${folder.folder_id}`)
        .then((response) => {
          const firstImage = response.data.firstImage;
          folder.firstImage = firstImage;
          setFolders([...folders]); // Update the state correctly
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, [folders]);

  return (
    <>
      <Navbar />
      <Flex direction="column" align="left" mt="4dvh">
        <Text fontSize="xl" fontWeight="bold" mb="2">
          List of Folders:
        </Text>
        <Wrap spacing="2">
          {folders.map((folder) => (
            <WrapItem key={folder.folder_id}>
              <Link to={`/images/${yearId}/${folder.folder_id}`}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  p="2"
                  borderWidth="1px"
                  borderRadius="md"
                  transition="transform 0.2s"
                  _hover={{ transform: 'scale(1.05)' }}
                >
                  {folder.firstImage && (
                    <Image
                      src={`data:image/jpeg;base64,${folder.firstImage}`}
                      alt={folder.folder_name}
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                      mb="2"
                    />
                  )}
                  <Text fontSize="lg">{folder.folder_name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    Click to view images
                  </Text>
                </Box>
              </Link>
            </WrapItem>
          ))}
        </Wrap>
      </Flex>
    </>
  );
}

export default FolderYears;
