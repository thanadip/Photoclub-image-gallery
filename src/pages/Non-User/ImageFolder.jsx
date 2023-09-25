import React, { useEffect, useState } from "react";
import UniversalNav from "../../components/UniversalNav";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Card,
  Flex,
  Img,
  List,
  ListItem,
  Text,
  filter,
} from "@chakra-ui/react";
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
        h={"100dvh"}
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
            {images.map((image, index) => (
              <Box
                key={index}
                padding="2px"
                textAlign="center"
                maxWidth="180px"
              >
                <PhotoView src={`data:image/png;base64,${image.pic_name}`}>
                  <Img
                    src={`data:image/png;base64,${image.pic_name}`}
                    alt={`Image ${index}`}
                    padding="5px"
                    // borderRadius={"10px"}
                    maxW="100%"
                    maxH={"200px"}
                    cursor={"pointer"}
                    _hover={{ filter: "brightness(80%)" }}
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
