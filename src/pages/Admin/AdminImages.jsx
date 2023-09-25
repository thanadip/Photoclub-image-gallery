import React, { useState, useEffect } from 'react';
import { 
  Flex, 
  Input, 
  Button, 
  Image, 
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Heading,
  Spacer,
  VStack,
  Container,
} from '@chakra-ui/react';
import UniversalNav from '../../components/UniversalNav';
import { ChevronDownIcon } from '@chakra-ui/icons';

function AdminImages() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState([]);
    const [selectedFolderName, setSelectedFolderName] = useState(null);
    const [selectedFolderId, setSelectedFolderId] = useState(null);

    const handleImageUpload = async () => {
        const formData = new FormData();
        selectedImages.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const response = await fetch('http://localhost:5001/upload-images', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Folder-ID': selectedFolderId, 
                },
            });

            if (response.ok) {
                setSelectedImages([]);
                setSelectedFolderId(null);
                alert('Upload successful!');
                window.location.reload();
            } else {
                throw new Error('Images failed to upload.');
            }
        } catch (error) {
            console.log('An error occurred:', error.message);
        }
    };

    const handleImageSelection = (e) => {
        setSelectedImages(Array.from(e.target.files));
    };

    const fetchFolderName = async () => {
        try {
            const response = await fetch('http://localhost:5001/get-folder');
            if (response.ok) {
                const folders = await response.json();
                setSelectedFolder(folders);
            } else {
                throw new Error('Failed to get folder names.');
            }
        } catch (error) {
            console.log('An error occurred:', error.message);
        }
    };

    useEffect(() => {
        fetchFolderName();
    }, []);

    const handleFolderSelection = (folderName , folderId) =>{
        setSelectedFolderName(folderName);
        setSelectedFolderId(folderId);
    }

    return (
        <>
            <UniversalNav />
            <Container maxW="container.md" mt="4">
                <Heading mb="4">Creat New Photo</Heading>
                <VStack align="start" spacing="4">
                    <Input type="file" multiple onChange={handleImageSelection} />
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            {selectedFolderName ? selectedFolderName : 'Select folder'}
                        </MenuButton>
                        <MenuList>
                            {selectedFolder.map((folder, index) => (
                                <MenuItem key={index} onClick={() => handleFolderSelection(folder.folder_name , folder.folder_id)}>
                                    {folder.folder_name}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Button onClick={handleImageUpload}>Upload Images</Button>
                </VStack>
                <Flex flexWrap="wrap" justifyContent="center" mt="4">
                    {selectedImages.map((image, index) => (
                        <Box
                            key={index}
                            maxW="200px" // Adjust the max width as needed
                            m="1rem" // Adjust the margin between images
                        >
                            <Image
                                src={URL.createObjectURL(image)}
                                alt={`Selected ${index}`}
                                maxW="100%" // Maintain the original aspect ratio
                                maxHeight="100%" // Maintain the original aspect ratio
                            />
                        </Box>
                    ))}
                </Flex>
            </Container>
        </>
    );
}

export default AdminImages;
