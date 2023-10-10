import React, { useState, useEffect } from "react";
import {
  Flex,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Heading,
  Spacer,
  VStack,
  Container,
  Text,
} from "@chakra-ui/react";
import UniversalNav from "../../components/UniversalNav";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Swal from "sweetalert2";

function AdminImages() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState([]);
  const [selectedFolderName, setSelectedFolderName] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const handleImageUpload = async () => {
    if (selectedImages.length > 100) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "You can upload a maximum of 100 images at once.",
        confirmButtonText: "OK",
      });
      return;
    }

    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    const confirmUpload = await Swal.fire({
      icon: "question",
      title: "Confirm Upload",
      text: "Do you want to upload these images?",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    });

    if (confirmUpload.isConfirmed) {
      try {
        const response = await fetch("http://localhost:5001/upload-images", {
          method: "POST",
          body: formData,
          headers: {
            "X-Folder-ID": selectedFolderId,
          },
        });

        if (response.ok) {
          setSelectedImages([]);
          setSelectedFolderId(null);
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: "Images uploaded successfully!",
            confirmButtonText: "OK",
          });
          window.location.reload();
        } else {
          throw new Error("Images failed to upload.");
        }
      } catch (error) {
        console.log("An error occurred:", error.message);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to upload images.",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleImageSelection = (e) => {
    setSelectedImages(Array.from(e.target.files));
  };

  const fetchFolderName = async () => {
    try {
      const response = await fetch("http://localhost:5001/get-folder");
      if (response.ok) {
        const folders = await response.json();
        setSelectedFolder(folders);
      } else {
        throw new Error("Failed to get folder names.");
      }
    } catch (error) {
      console.log("An error occurred:", error.message);
    }
  };

  useEffect(() => {
    fetchFolderName();
  }, []);

  const handleFolderSelection = (folderName, folderId) => {
    setSelectedFolderName(folderName);
    setSelectedFolderId(folderId);
  };

  return (
    <>
      <UniversalNav />
      <Container maxW="container.md" mt="4">
        <Heading mb="4">Create New Photo</Heading>
        <VStack align="start" spacing="7">
          <Text>Select images to upload :</Text>
          <Input type="file" multiple onChange={handleImageSelection} />
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {selectedFolderName ? selectedFolderName : "Select folder"}
            </MenuButton>
            <MenuList>
              {selectedFolder.map((folder, index) => (
                <MenuItem
                  key={index}
                  onClick={() =>
                    handleFolderSelection(folder.folder_name, folder.folder_id)
                  }
                >
                  {folder.folder_name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Button onClick={handleImageUpload}>Upload Images</Button>
        </VStack>
        <Flex flexWrap="wrap" justifyContent="center" mt="4">
          {selectedImages.map((image, index) => (
            <Box key={index} maxW="200px" m="1rem">
              <img
                src={URL.createObjectURL(image)}
                alt={`Selected ${index}`}
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </Box>
          ))}
        </Flex>
      </Container>
    </>
  );
}

export default AdminImages;
