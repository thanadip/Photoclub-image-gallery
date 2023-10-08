import React, { useEffect, useState } from "react";
import UniversalNav from "../../components/UniversalNav";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Flex, Img, Text, IconButton } from "@chakra-ui/react";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

function AdminManageImage() {
  const [images, setImages] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const { folderId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const userRole = Cookies.get("userRole");

  useEffect(() => {
    axios
      .get(`http://localhost:5001/get-images/${folderId}`)
      .then((response) => {
        setImages(response.data);
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

  const handleDeleteImage = async (imageId, index) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this image?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      try {
        if (userRole != 2) {
          await Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "You don't have permission to Delete Image!",
          });
          return;
        }

        const response = await axios.delete(
          `http://localhost:5001/images/${imageId}`
        );
        if (response.status === 200) {
          setImages((prevImages) =>
            prevImages.filter((image) => image.pic_id !== imageId)
          );
          setThumbnails((prevThumbnails) =>
            prevThumbnails.filter((_, i) => i !== index)
          );
          await Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Image deleted successfully!",
            confirmButtonText: "OK",
          });
        } else {
          console.error("Error deleting image:", error);
          await Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to delete image!",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to delete image!",
          confirmButtonText: "OK",
        });
      }
    }
  };

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
                flexDirection="column"
                alignItems="center"
                position="relative"
                height="170px"
              >
                <PhotoView
                  src={`data:image/png;base64,${images[index].pic_name}`}
                >
                  <Img
                    src={`data:image/png;base64,${thumbnail.pic_name}`}
                    alt={`Image ${index}`}
                    maxW="100%"
                    maxH="100%"
                    my="auto"
                    cursor="pointer"
                    loading="lazy"
                  />
                </PhotoView>
                <IconButton
                  icon={<FaTrash />}
                  aria-label="Delete image"
                  colorScheme="red"
                  size="xs"
                  position="absolute"
                  top="0"
                  right="0"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteImage(images[index].pic_id, index);
                  }}
                />
              </Box>
            ))}
          </PhotoProvider>
        </Flex>
      </Flex>
    </>
  );
}

export default AdminManageImage;
