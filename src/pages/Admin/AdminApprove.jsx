import React, { useEffect, useState } from "react";
import UniversalNav from "../../components/UniversalNav";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  Flex,
  Text,
  Box,
  Wrap,
  WrapItem,
  Image,
  Button,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

function AdminApprove() {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const folderResponse = await axios.get(
          `http://localhost:5001/get-folder`
        );
        const foldersData = folderResponse.data;

        const updatedFolders = await Promise.all(
          foldersData.map(async (folder) => {
            try {
              const thumbnailResponse = await axios.get(
                `http://localhost:5001/get-thumbnail/${folder.folder_id}`
              );

              const firstImage = thumbnailResponse.data.firstImage;
              folder.firstImage = firstImage;
              return folder;
            } catch (error) {
              if (error.response && error.response.status === 404) {
                folder.firstImage = null;
                return folder;
              } else {
                console.log(error);
                return folder;
              }
            }
          })
        );

        setFolders(updatedFolders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteFolder = async (folderId) => {
    const confirmDelete = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Do you want to delete this folder?",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    });

    if (confirmDelete.isConfirmed) {
      try {
        console.log(folderId);
        const response = await fetch(
          `http://localhost:5001/folder/${folderId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setFolders((prevFolders) =>
            prevFolders.filter((folder) => folder.folder_id !== folderId)
          );

          Swal.fire({
            icon: "success",
            title: "Folder Deleted",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: "Failed to delete the folder",
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Something went wrong",
        });
      }
    }
  };

  const updateFolderStatus = async (folderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5001/folder/${folderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folder_status: newStatus }),
      });

      if (response.ok) {
        setFolders((prevFolders) =>
          prevFolders.map((folder) =>
            folder.folder_id === folderId
              ? { ...folder, folder_status: newStatus }
              : folder
          )
        );

        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Album status updated successfully!",
          confirmButtonText: "OK",
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to update Album status!",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error updating Album status:", error);
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update Album status!",
        confirmButtonText: "OK",
      });
    }
  };

  const handleHideFolder = async (folderId) => {
    console.log(folderId);
    const confirmHide = await Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "Do you want to hide this folder?",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    });

    if (confirmHide.isConfirmed) {
      updateFolderStatus(folderId, 0);
    }
  };

  const handleShowFolder = async (folderId) => {
    const confirmShow = await Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "Do you want to show this Album?",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    });

    if (confirmShow.isConfirmed) {
      updateFolderStatus(folderId, 1);
    }
  };

  return (
    <>
      <UniversalNav />
      <Flex direction="column" align="center" mt="4dvh">
        <Text fontSize="xl" fontWeight="bold" mb="2">
          List of Album:
        </Text>
        <Wrap spacing="2">
          {folders.map((folder) => (
            <WrapItem key={folder.folder_id}>
              <Link to={`/manage-images/${folder.year_id}/${folder.folder_id}`}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  p="2"
                  borderWidth="1px"
                  borderRadius="md"
                  position="relative"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.05)" }}
                >
                  <IconButton
                    icon={<FaTrash />}
                    aria-label="Delete folder"
                    colorScheme="red"
                    size="sm"
                    position="absolute"
                    top="0"
                    right="0"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteFolder(folder.folder_id);
                    }}
                  />
                  {folder.firstImage && (
                    <Image
                      src={`data:image/jpeg;base64,${folder.firstImage}`}
                      alt={folder.folder_name}
                      boxSize="200px"
                      objectFit="cover"
                      borderRadius="md"
                      mb="2"
                    />
                  )}
                  <Text fontSize="lg">{folder.folder_name}</Text>
                  <Stack direction={"row"} maxW={"180px"}>
                    <Button
                      fontSize={"sm"}
                      bgColor={"green.500"}
                      color={"white"}
                      size={"sm"}
                      onClick={(e) => {
                        e.preventDefault();
                        handleShowFolder(folder.folder_id);
                      }}
                    >
                      Show folder
                    </Button>
                    <Button
                      fontSize={"sm"}
                      bgColor={"gray.500"}
                      color={"white"}
                      size={"sm"}
                      onClick={(e) => {
                        e.preventDefault();
                        handleHideFolder(folder.folder_id);
                      }}
                    >
                      Hide folder
                    </Button>
                  </Stack>
                  <Text fontSize="sm" mt="10px">
                    Current Status:{" "}
                    <Text
                      display="inline-block"
                      color={
                        folder.folder_status === 0 ? "red.500" : "green.500"
                      }
                    >
                      {folder.folder_status === 0 ? "Hidden" : "Showing"}
                    </Text>
                  </Text>
                </Box>
              </Link>
            </WrapItem>
          ))}
        </Wrap>
      </Flex>
    </>
  );
}
export default AdminApprove;
