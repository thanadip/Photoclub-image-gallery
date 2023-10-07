import React, { useState, useEffect } from "react";
import UniversalNav from "../../components/UniversalNav";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Flex,
  List,
  ListItem,
  Text,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Box,
  Center,
  IconButton,
  Button,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

function AdminHome() {
  const [years, setYears] = useState([]);
  const navigate = useNavigate();

  const handleYearClick = async (year_id) => {
    try {
      const response = await fetch(
        `http://localhost:5001/get-folders/${year_id}`
      );
      const data = await response.json();
      console.log("OK", data);
      navigate(`/images/${year_id}`);
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  };

  const handleDeleteYear = async (year_id) => {
    const confirmDelete = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Do you want to delete this year?",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:5001/years/${year_id}`
        );

        if (response.status === 200) {
          setYears((prevYears) =>
            prevYears.filter((year) => year.year_id !== year_id)
          );

          Swal.fire({
            icon: "success",
            title: "Year Deleted",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: "Failed to delete the year",
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

  useEffect(() => {
    axios
      .get("http://localhost:5001/get-year")
      .then((response) => {
        setYears(response.data);
      })
      .catch((error) => {
        console.error("Error fetching years:", error);
      });
  }, []);

  return (
    <>
      <UniversalNav />
      <Flex direction="column" align="center">
        <Center>
          <Card w="100%" mt={"8dvh"}>
            <CardHeader>
              <Heading size="md">เลือกปีการศึกษา:</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                {years.map((year, index) => (
                  <Box
                    key={index}
                    onClick={() => handleYearClick(year.year_id)}
                    _hover={{ bgColor: "blue.100" }}
                    cursor={"pointer"}
                    borderRadius={"md"}
                    border={"1px"}
                    borderColor={"gray.100"}
                    w="100%"
                    p="4"
                    mb="4"
                    position="relative"
                  >
                    <IconButton
                      icon={<FaTrash />}
                      aria-label="Delete year"
                      colorScheme="red"
                      size="xs"
                      position="absolute"
                      top="0"
                      right="0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteYear(year.year_id);
                      }}
                    />
                    <Heading size="L" textTransform="uppercase">
                      ปีการศึกษา {year.year_name}
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      ประมวลภาพกิจกรรมในปีการศึกษา {year.year_name}
                    </Text>
                  </Box>
                ))}
              </Stack>
            </CardBody>
          </Card>
        </Center>
      </Flex>
    </>
  );
}

export default AdminHome;
