import React, { useState, useEffect } from 'react';
import { Flex, Input, Button, Image } from '@chakra-ui/react';
import AdminNavbar from '../../components/AdminNavbar'

function AdminImages() {

    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageUpload = async () => {
    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await fetch('http://localhost:5001/upload-images', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSelectedImages([]);
        alert('upload successfully!');
      } else {

        throw new Error('Images failed to upload. ');

      }
    } catch (error) {

      console.log('An error occurred:', error.message);
    }
  };

  const handleImageSelection = (e) => {
    setSelectedImages(Array.from(e.target.files));
  };

    return (
        <>
          <AdminNavbar />
          <Flex direction="column" align="center">
    
            <Input type="file" multiple onChange={handleImageSelection} />
    
            <Button onClick={handleImageUpload}>Upload Images</Button>
            
            {selectedImages.map((image, index) => (
              <Image key={index} src={URL.createObjectURL(image)} alt={`Selected ${index}`} />
            ))}

          </Flex>
        </>
      );
}

export default AdminImages