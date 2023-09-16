import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Flex, List, ListItem, Text } from '@chakra-ui/react';
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';

function ImageFolder() {
  const [images, setImages] = useState([]);
  const { folderId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/get-images/${folderId}`)
      .then((response) => {
        setImages(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [folderId]);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <Navbar />
      <Flex direction="column" align="center" maxH={'200px'} maxW={'200px'} mx={'auto'}>
        <Text fontSize="xl" fontWeight="bold" mb="2">
          List of Images:
        </Text>

        <PhotoProvider
          currentIndex={currentImageIndex}
          onClick={handleImageClick}
          speed={() => 800}
        >
          <List spacing="2">
            {images.map((image, index) => (
              <ListItem key={index}>
                <PhotoView src={`data:image/png;base64,${image.pic_name}`}>
                  <img
                    src={`data:image/png;base64,${image.pic_name}`}
                    alt={`Image ${index}`}
                  />
                </PhotoView>
              </ListItem>
            ))}
          </List>
        </PhotoProvider>
      </Flex>
    </>
  );
}

export default ImageFolder;
