import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import UniversalNav from "../../components/UniversalNav";

function PageNotFound() {
  return (
    <>
      <UniversalNav />
      <Flex mx={"auto"} justify={"center"} my={"40dvh"}>
        <Text fontSize={"6xl"}>Page not found</Text>
      </Flex>
    </>
  );
}

export default PageNotFound;
