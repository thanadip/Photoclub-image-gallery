import React, { useState, useEffect } from 'react';
import { Flex, Input, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import AdminNavbar from '../../components/AdminNavbar';
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
                alert('Added year successful!');
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
                console.log(years);
            } else {
                throw new Error('failed to get years name');
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
        console.log('Selected Year ID:', yearId);
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
                alert('Added folder successful!');
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
            <AdminNavbar />
            <Flex direction="column" align="center">
                <Input
                    placeholder="Enter folder name"
                    type='text'
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                />
                <Button onClick={() => handleCreateFolder()}>Create Folder</Button>
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
                    placeholder="Enter year name"
                    type="text"
                    value={yearName}
                    onChange={(e) => setYearName(e.target.value)}
                />
                <Button onClick={handleCreateYear}>Create Year</Button>
            </Flex>

        </>
    );
}

export default AdminFolders;
