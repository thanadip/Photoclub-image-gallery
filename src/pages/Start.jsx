import React from 'react';
import { Flex, Box, Text, Stack, Button, ButtonGroup } from '@chakra-ui/react';

function Start() {
  return (
    <Flex justifyContent='center' alignItems='center' height='100vh'>
      <Box width='60vw'>
        <Stack textAlign='center'>
          <Text fontSize='6xl'>Patipon Sombut</Text>
          <Text fontSize='5xl'>Commission gallery</Text>
          <ButtonGroup spacing='4' mt='8' ml='auto' mr='auto'>
          <Button colorScheme='teal' w='175px' h='50px'>
            Get Started
          </Button>
          <Text fontSize='15px' color='gray' mt='auto' mb='auto'>or</Text>
          <Button as='a' href ='https://www.instagram.com/image_yoddoy.jpg/' target='_blank' color='#C13584' w='175px' h='50px' variant='outline'>
          Instagram
          </Button>
        </ButtonGroup>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Start;
