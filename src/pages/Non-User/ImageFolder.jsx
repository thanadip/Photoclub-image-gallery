import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Flex, Text } from '@chakra-ui/react';
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css'; 
import { object } from 'prop-types';


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

  const galleryImages = images.map((image ) => ({
    original: `data:image/png;base64,${image.pic_name}`,
    thumbnail: `data:image/png;base64,${image.pic_name}`
  }));

  const isEmpty =  galleryImages.length === 0;

  return (
    <>
      <Navbar />
      <Flex direction="column" align="center">
        <Text fontSize="xl" fontWeight="bold" mb="2">List of Images:</Text>
        
        {isEmpty ? (
          <Text> NO image display</Text>
        ) : (
          <ReactImageGallery items={galleryImages} />
        )
        }
        
      </Flex>
    </>
  );
}

export default ImageFolder;
