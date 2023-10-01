import React, { useEffect, useState } from "react";
import UniversalNav from "../../components/UniversalNav";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Flex, Img, Text } from "@chakra-ui/react";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";

function ImageFolder() {
  const [images, setImages] = useState([]);
  const { folderId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/get-images/${folderId}`)
      .then((response) => {
        setImages(response.data);
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
      <UniversalNav />
      <Flex
        direction="column"
        align="center"
        p="4"
        bg={"gray.100"}
        h={"100vh"}
      >
        <Text fontSize="xl" fontWeight="bold" mb="2">
          List of Images:
        </Text>

        <Flex flexWrap="wrap" justify="center" bg={"gray.100"}>
          <PhotoProvider
            currentIndex={currentImageIndex}
            onClick={handleImageClick}
            speed={() => 800}
          >
            {images.map((image) => (
              <Box
                key={image.id}
                padding="2px"
                textAlign="center"
                maxWidth="420px"
                m="1rem" // Add some margin between images
                borderRadius="4px" // Add border-radius for rounded corners
                transition="0.3s" // Add a smooth transition effect
                _hover={{ boxShadow: "0px 0px 5px 2px #ccc" }} // Add a hover effect
                display="flex"
                justifyContent="center" // Center horizontally
                alignItems="center" // Center vertically
                height="170px" // Set a fixed height for the container
              >
                <PhotoView src={`data:image/png;base64,${image.pic_name}`}>
                  <Img
                    src={`data:image/png;base64,${image.pic_name}`}
                    alt={`Image ${image.id}`}
                    maxW="100%"
                    maxH={"100%"}
                    cursor={"pointer"}
                    loading="lazy"
                  />
                </PhotoView>
              </Box>
            ))}
          </PhotoProvider>
        </Flex>
      </Flex>
    </>
  );
}

export default ImageFolder;
