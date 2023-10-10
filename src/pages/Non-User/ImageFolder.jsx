import React, { useEffect, useState } from "react";
import UniversalNav from "../../components/UniversalNav";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Flex, Img, Text, Spinner } from "@chakra-ui/react"; // Import Spinner from Chakra UI
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Cookies from "js-cookie";

function ImageFolder() {
  const [images, setImages] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const { folderId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Check if images are cached in cookies
    const cachedImages = Cookies.get(`cachedImages_${folderId}`);
    if (cachedImages) {
      setImages(JSON.parse(cachedImages));
      setLoading(false); // Set loading to false when images are loaded from cache
      return;
    }

    axios
      .get(`http://localhost:5001/get-images/${folderId}`)
      .then((response) => {
        setImages(response.data);
        setLoading(false); // Set loading to false when images are loaded
        // Cache images in cookies
        Cookies.set(`cachedImages_${folderId}`, JSON.stringify(response.data), {
          expires: 1, // Cache for 1 day
        });
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`http://localhost:5001/gen-thumbnail/${folderId}`)
      .then((response) => {
        setThumbnails(response.data);
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
      <Flex direction="column" align="center" p="4" bg={"white"} h={"100vh"}>
        <Text fontSize="xl" fontWeight="bold" mb="2">
          List of Images:
        </Text>

        {loading ? ( // Show the spinner when loading is true
        <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>        ) : (
          <Flex flexWrap="wrap" justify="center" bg={"gray.100"}>
            <PhotoProvider
              currentIndex={currentImageIndex}
              onClick={handleImageClick}
              speed={() => 800}
            >
              {thumbnails.map((thumbnail, index) => (
                <Box
                  key={index}
                  padding="2px"
                  textAlign="center"
                  maxWidth="420px"
                  m="1rem"
                  borderRadius="4px"
                  transition="0.3s"
                  _hover={{ boxShadow: "0px 0px 5px 2px #ccc" }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="140px"
                >
                  <PhotoView
                    src={`data:image/png;base64,${images[index].pic_name}`}
                  >
                    <Img
                      src={`data:image/png;base64,${thumbnail.pic_name}`}
                      alt={`Image ${index}`}
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
        )}
      </Flex>
    </>
  );
}

export default ImageFolder;
