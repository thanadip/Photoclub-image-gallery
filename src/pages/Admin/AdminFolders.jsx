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
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

function AdminFolders() {
  const [yearName, setYearName] = useState("");
  const [folderName, setFolderName] = useState("");
  const [selectedYearName, setSelectedYearName] = useState("");
  const [selectedYearId, setSelectedYearId] = useState("");
  const [selectedYear, setSelectedYear] = useState([]);

  const userRole = Cookies.get("userRole");

  const handleCreateYear = async () => {
    try {
      if (userRole != 2) {
        await Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "You don't have permission to create year!",
        });
        return;
      }

      if (!yearName) {
        await Swal.fire({
          icon: "warning",
          title: "Input not found",
          text: "Blank input field!",
        });
        return;
      }

      const response = await axios.post("http://localhost:5001/add-year", {
        year_name: yearName,
      });

      if (response.status === 409) {
        await Swal.fire({
          icon: "error",
          title: "Year existed",
          text: "Year already existed!",
          confirmButtonText: "OK",
        });
      }

      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Year added successfully!",
        });
        setYearName("");
        window.location.reload();
      } else {
        throw new Error("Added year failed");
      }
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        title: "Year existed",
        text: "Year already existed!",
        confirmButtonText: "OK",
      });
    }
  };

  const fetchYearName = async () => {
    try {
      const response = await fetch("http://localhost:5001/get-year");
      if (response.ok) {
        const years = await response.json();
        setSelectedYear(years);
      } else {
        throw new Error("Failed to get year names");
      }
    } catch (error) {
      console.log("An error occurred:", error.message);
    }
  };

  useEffect(() => {
    fetchYearName();
  }, []);

  const handleYearSelection = (yearName, yearId) => {
    setSelectedYearName(yearName);
    setSelectedYearId(yearId);
  };

  const handleCreateFolder = async () => {
    try {
      if (!folderName) {
        await Swal.fire({
          icon: "warning",
          title: "Blank input",
          text: "Missing input field!",
        });

        return;
      }

      if (!selectedYearId) {
        await Swal.fire({
          icon: "warning",
          title: "No year selected",
          text: "Please select year!",
        });
      }

      const response = await axios.post("http://localhost:5001/add-folder", {
        folder_name: folderName,
        year_id: selectedYearId,
      });

      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Added folder successfully!",
        });
        setFolderName("");
        window.location.reload();
      } else {
        throw new Error("Added folder failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <UniversalNav />
      <Container maxW="container.md" mt="4">
        <Heading mb="4">Create New Albums</Heading>
        <VStack align="start" spacing="4">
          <Text>Create a new album within an existing year:</Text>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {selectedYearName ? selectedYearName : "Select year"}
            </MenuButton>
            <MenuList>
              {selectedYear.map((year, index) => (
                <MenuItem
                  key={index}
                  onClick={() =>
                    handleYearSelection(year.year_name, year.year_id)
                  }
                >
                  {year.year_name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Input
            placeholder="Enter folder name"
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <Button onClick={handleCreateFolder}>Create Album</Button>
        </VStack>
        <Spacer mt="10" />
        <hr></hr>
        <VStack align="start" spacing="4">
          <Text mt={"5dvh"}>Create a new year:</Text>
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
