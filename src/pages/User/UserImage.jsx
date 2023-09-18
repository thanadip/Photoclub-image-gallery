import React, { useState, useEffect } from 'react';
import UniversalNav from '../../components/UniversalNav';
import { Flex, Input, Button, Image, Center } from '@chakra-ui/react';

function UserImage() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    fetchUploadedImages();
  }, []);

  const fetchUploadedImages = async () => {
    try {
      const response = await fetch('http://localhost:5001/display-images'); 
      if (response.ok) {
        const images = await response.json();
        setUploadedImages(images);
        console.log(images);
      } else {
        
        throw new Error('Images failed to upload. ');

      }
    } catch (error) {
      console.log('An error occurred:', error.message);
      
    }
  };

  return (
    <>
      <UniversalNav />
      <Flex direction="column" align="center" maxH={'200px'} maxW={'200px'} mx={'auto'}>

        {uploadedImages.map((image, index) => (
        <Image key={index} src={`data:image/png;base64,${image.pic_name}`} alt={`Uploaded ${index}`} />
      ))}
      </Flex>
    </>
  );
}

export default UserImage;
