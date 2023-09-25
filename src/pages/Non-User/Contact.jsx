import React from "react";
import UniversalNav from "../../components/UniversalNav";
import { Stack, Card, Flex, Text, Box, Img } from "@chakra-ui/react";

function contact() {
  return (
    <>
      <UniversalNav />

      <Flex h={"100%"} direction={"column"} alignItems={"center"} mt={"100px"}>
        <Stack mx={"auto"} textAlign={"center"}>
          <Text fontSize={"4xl"}> Contact us</Text>
          <Text fontSize={"2xl"}>
            {" "}
            Have any question? We'd love to hear from you.
          </Text>
        </Stack>

        <Flex
          mt={"70px"}
          w={"75dvw"}
          justifyContent={"space-around"}
          textAlign={"center"}
        >
          <Card
            bg={""}
            h={"350px"}
            w={"250px"}
            borderTop={"8px"}
            borderTopColor={"#1877f2"}
            _hover={{ transform: "scale(1.05)", transition: "transform 0.3s" }}
            cursor={"pointer"}
          >
            <Text>Facebook</Text>
            <Img
              src="src\assets\facebookQR.png"
              maxW={"70%"}
              maxH={"70%"}
              mx={"auto"}
              my={"10px"}
            ></Img>
            <Text>ชมรมศิลปะการถ่ายภาพ มหาวิทยาลัยสงขลานครินทร์</Text>
          </Card>

          <Card
            bg={""}
            h={"350px"}
            w={"250px"}
            mt={"20px"}
            borderTop={"8px"}
            borderTopColor={"#C13584"}
            _hover={{ transform: "scale(1.05)", transition: "transform 0.3s" }}
            cursor={"pointer"}
          >
            <Text>Instragram</Text>
            <Img
              src="src\assets\instragramQR.png"
              maxW={"70%"}
              maxH={"70%"}
              mx={"auto"}
              my={"10px"}
            ></Img>
            <Text>📸✨ชมรมศิลปะการถ่ายภาพ มหาวิทยาลัยสงขลานครินทร์</Text>
          </Card>

          <Card
            bg={""}
            h={"350px"}
            w={"250px"}
            borderTop={"8px"}
            borderTopColor={"#00b900"}
            _hover={{ transform: "scale(1.05)", transition: "transform 0.3s" }}
            cursor={"pointer"}
          >
            <Text>Line</Text>
            <Img
              src="src\assets\facebookQR.png"
              maxW={"70%"}
              maxH={"70%"}
              mx={"auto"}
              my={"10px"}
            ></Img>
            <Text>ชมรมศิลปะการถ่ายภาพ มหาวิทยาลัยสงขลานครินทร์</Text>
          </Card>
        </Flex>
      </Flex>
    </>
  );
}

export default contact;
