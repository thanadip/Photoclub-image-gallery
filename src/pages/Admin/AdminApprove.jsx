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
} from "@chakra-ui/react";

function AdminApprove() {
  const [folders, setFolders] = useState([]);
  const { yearId } = useParams();

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
              <Link to={`/images/${yearId}/${folder.folder_id}`}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  p="2"
                  borderWidth="1px"
                  borderRadius="md"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.05)" }}
                >
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
                  <Text fontSize="sm" color="gray.500">
                    Click to view images
                  </Text>
                  <Stack direction={"row"} maxW={"180px"}>
                    <Button fontSize={"sm"} bgColor={"red.500"} color={"white"}>
                      Delete folder
                    </Button>
                    <Button fontSize={"sm"}>Hide folder</Button>
                  </Stack>
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
