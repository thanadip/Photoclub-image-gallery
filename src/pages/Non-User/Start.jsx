import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box, Text, Stack, Button, ButtonGroup } from '@chakra-ui/react';

function Start() {
  return (
    <Flex justifyContent='center' alignItems='center' height='100vh'>
      <Box width='60vw'>
        <Stack textAlign='center'>
          <Text fontSize='6xl'>PSU Photo club </Text>
          <Text fontSize='5xl'>Activity gallery</Text>
          <ButtonGroup spacing='4' mt='8' ml='auto' mr='auto'>
          <Link to ="/index">
          <Button bg='#2582FE' color='white' w='175px' h='50px'>
            Get Started
          </Button>
          </Link>
          <Text fontSize='15px' color='gray' mt='auto' mb='auto'>or</Text>
          <Button as='a' href ='https://www.instagram.com/photoclub.psu/' target='_blank' color='#C13584' w='175px' h='50px' variant='outline'>
          <a class="fa fa-instagram"></a>
          &nbsp;Instagram
          </Button>
        </ButtonGroup>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Start;
