import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Blocked() {
  return (
    <>
      <Flex mx={"auto"} justify={"center"} my={"40dvh"}>
        <Stack>
          <Text fontSize={"6xl"}>No permission</Text>
          <Text fontSize={"4xl"} mx={"auto"} textColor="gray">
            Pending approval
          </Text>
          <Button mt={"50px"} as={Link} to={"/index"} colorScheme="blue">
            Go to homepage
          </Button>
        </Stack>
      </Flex>
    </>
  );
}

export default Blocked;
