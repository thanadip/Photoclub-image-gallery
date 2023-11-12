import React, { useEffect, useState, useRef } from "react";
import UniversalNav from "../../components/UniversalNav";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Img,
  Text,
  Spinner,
} from "@chakra-ui/react";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Cookies from "js-cookie";

function ImageFolder() {
  const [images, setImages] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [page, setPage] = useState(1);
  const imagesPerPage = 10; // Number of images to load at a time
  const hasMoreImages = useRef(true);
  const { folderId } = useParams();

  useEffect(() => {
    const cachedImages = Cookies.get(`cachedImages_${folderId}`);
    const loadImagesForPage = async (pageToLoad) => {
      try {
        const response = await axios.get(
          `http://localhost:5001/get-images/${folderId}?page=${pageToLoad}&perPage=${imagesPerPage}`
        );
        const newImages = response.data;

        if (newImages.length < imagesPerPage) {
          hasMoreImages.current = false;
        }

        setImages((prevImages) => [...prevImages, ...newImages]);
        setLoading(false);

        // Cache images in cookies (only if it's the first page)
        if (pageToLoad === 1) {
          Cookies.set(
            `cachedImages_${folderId}`,
            JSON.stringify(prevImages),
            {
              expires: 1,
            }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    const loadThumbnails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/gen-thumbnail/${folderId}`
        );
        setThumbnails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const loadImagesAndThumbnails = async () => {
      await Promise.all([loadImagesForPage(page), loadThumbnails()]);
    };

    // Load images and thumbnails for the initial page
    loadImagesAndThumbnails();
  }, [folderId, page]);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (hasMoreImages.current) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <UniversalNav />
      <Flex
        direction="column"
        align="center"
        p="4"
        bg={"white"}
        h={"100vh"}
      >
        <Text fontSize="xl" fontWeight="bold" mb="2">
          List of Images:
        </Text>

        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
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
