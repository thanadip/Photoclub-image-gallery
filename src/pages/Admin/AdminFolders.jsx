import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import UniversalNav from '../../components/UniversalNav';
import { ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';

function AdminFolders() {

    const [yearName, setYearName] = useState('');
    const [folderName , setFolderName] = useState('');
    const [selectedYearName, setSelectedYearName] = useState('');
    const [selectedYearId, setSelectedYearId] = useState('');
    const [selectedYear, setSelectedYear] = useState([]);

    const handleCreateYear = async () => {

        try {

            if (!yearName) {
                alert('Missing year name input!');
                return;
            }

            const response = await axios.post('http://localhost:5001/add-year', {
                year_name: yearName,
            })

            if (response.status === 200) {
                alert('Added year successfully!');
                setYearName('');
                window.location.reload();
            } else {
                alert('Added year failed');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again later.');
        }

    }

    const fetchYearName = async () => {

        try {

            const response = await fetch('http://localhost:5001/get-year');
            if (response.ok) {
                const years = await response.json();
                setSelectedYear(years);
            } else {
                throw new Error('Failed to get year names');
            }

        } catch (error) {
            console.log('An error occurred:', error.message);
        }
    }

    useEffect(() => {
        fetchYearName();
    }, []);

    const handleYearSelection = (yearName, yearId) => {
        setSelectedYearName(yearName);
        setSelectedYearId(yearId);
    }

    const handleCreateFolder = async () =>{

        try {
            if(!folderName){
                alert('Missing folder name input!');
                return;
            }
            
            const response = await axios.post('http://localhost:5001/add-folder',{
                folder_name: folderName,
                year_id: selectedYearId,
            })

            if (response.status === 200) {
                alert('Added folder successfully!');
                setFolderName('');
                window.location.reload();
            } else {
                alert('Added folder failed');
            }

        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again later.');
        }
    }

    return (
        <>
            <UniversalNav />
            <Container maxW="container.md" mt="4">
                <Heading mb="4">Create New Albums</Heading>
                <VStack align="start" spacing="4">
                    <Text>Create a new album within an existing year:</Text>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
                            {selectedYearName ? selectedYearName : 'Select year'}
                        </MenuButton>
                        <MenuList>
                            {selectedYear.map((year, index) => (
                                <MenuItem key={index} onClick={() => handleYearSelection(year.year_name, year.year_id)}>
                                    {year.year_name}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Input
                        placeholder="Enter folder name"
                        type='text'
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                    />
                    <Button onClick={handleCreateFolder}>Create Album</Button>
                </VStack>
                <Spacer mt="4" />
                <VStack align="start" spacing="4">
                    <Text>Create a new year:</Text>
                    <Input
                        placeholder="Enter year name"
                        type="text"
                        value={yearName}
                        onChange={(e) => setYearName(e.target.value)}
                    />
                    <Button onClick={handleCreateYear}>Create Year</Button>
                </VStack>
            </Container>
        </>
    );
}

export default AdminFolders;
