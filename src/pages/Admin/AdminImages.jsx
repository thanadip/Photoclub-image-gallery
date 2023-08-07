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
} from '@chakra-ui/react';
import AdminNavbar from '../../components/AdminNavbar';
import { ChevronDownIcon } from '@chakra-ui/icons';

function AdminImages() {

    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState([]);
    const [selectedFolderName, setSelectedFolderName] = useState(null);

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
          alert('Upload successful!');
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

    const handleFolderSelection = (folderName) =>{
      setSelectedFolderName(folderName);
    }

    return (
      <>
        <AdminNavbar />
        <Flex direction="column" align="center">

          <Input type="file" multiple onChange={handleImageSelection} />

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {selectedFolderName ? selectedFolderName : 'Select folder'}
            </MenuButton>
            <MenuList>
              {selectedFolder.map((folder, index) => (
                <MenuItem key={index} onClick={() => handleFolderSelection(folder.folder_name)}>
                {folder.folder_name}
              </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Button onClick={handleImageUpload}>Upload Images</Button>

          {selectedImages.map((image, index) => (
            <Image key={index} src={URL.createObjectURL(image)} alt={`Selected ${index}`} />
          ))}

        </Flex>
      </>
    );
}

export default AdminImages;
