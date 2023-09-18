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
import UniversalNav from '../../components/UniversalNav';
import { ChevronDownIcon } from '@chakra-ui/icons';

function AdminImages() {

    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState([]);
    const [selectedFolderName, setSelectedFolderName] = useState(null);
    const [selectedFolderId, setSelectedFolderId] =useState(null);

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
          console.log(folders);
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
      console.log('Selected Folder ID:', folderId);
    }

    return (
      <>
        <UniversalNav />
        <Flex direction="column" align="center">

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

          {selectedImages.map((image, index) => (
            <Image key={index} src={URL.createObjectURL(image)} alt={`Selected ${index}`} />
          ))}

        </Flex>
      </>
    );
}

export default AdminImages;
