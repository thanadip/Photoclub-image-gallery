import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
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
} from "@chakra-ui/react";

function UserHome() {
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
      <Navbar />
      <Flex direction="column" align="left" mt="8dvh" maxW={"50vw"}>
        <Card>
          <CardHeader>
            <Heading size="md">เลือกปีการศึกษา:</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {years.map((year) => (
                <Box
                  key={`year-${year.year_id}`}
                  onClick={() => handleYearClick(year.year_id)}
                  _hover={{ bgColor: "blue.100" }}
                  cursor={"pointer"}
                  borderRadius={"md"}
                  border={"1px"}
                  borderColor={"gray.100"}
                >
                  <Heading size="L" textTransform="uppercase">
                    ปีการศึกษา {year.year_name}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    รวมกิจกรรมในปีการศึกษา {year.year_name}
                  </Text>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
}

export default UserHome;
