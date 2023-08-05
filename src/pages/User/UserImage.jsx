import React, { useState, useEffect } from 'react';
import UserNavbar from '../../components/UserNavbar';
import { Flex, Input, Button, Image } from '@chakra-ui/react';

function UserImage() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    fetchUploadedImages();
  }, []);

  const fetchUploadedImages = async () => {
    try {
      const response = await fetch('http://localhost:5001/images'); 
      if (response.ok) {
        const images = await response.json();
        setUploadedImages(images);
      } else {
        // Handle error while fetching images
      }
    } catch (error) {
      // Handle fetch or other errors
    }
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await fetch('/images', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSelectedImages([]);
        fetchUploadedImages();
      } else {
        // Handle error during image upload.
      }
    } catch (error) {
      // Handle fetch or other errors.
    }
  };

  const handleImageSelection = (e) => {
    setSelectedImages(Array.from(e.target.files));
  };

  return (
    <>
      <UserNavbar />
      <Flex direction="column" align="center">
        <Input type="file" multiple onChange={handleImageSelection} />
        <Button onClick={handleImageUpload}>Upload Images</Button>
        {selectedImages.map((image, index) => (
          <Image key={index} src={URL.createObjectURL(image)} alt={`Selected ${index}`} />
        ))}
        {uploadedImages.map((image, index) => (
          <Image key={index} src={`data:image/png;base64,${image.pic_name.toString('base64')}`} alt={`Uploaded ${index}`} />
        ))}
      </Flex>
    </>
  );
}

export default UserImage;