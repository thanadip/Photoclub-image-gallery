import React from 'react';
import { Box, Card, Flex, Text, Stack, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input ,Button} from '@chakra-ui/react';

function Register() {

  const handleRegister =() =>{
    alert('clicked');
  }

  return (
    <Flex h={'100vh'} justify={'center'} backgroundColor={'teal'}>
      <Flex mr={'auto'}>
        <Stack my={'auto'} mx={'5vw'} pb={'10vw'} >
          <Text fontSize={'6xl'} textAlign={'left'}>Create an account</Text>
          <Text fontSize={'3xl'} textAlign={'left'}>&nbsp;&nbsp;&nbsp;Make your own account for private contacting! </Text>
        </Stack>
      </Flex>

      <Flex minW={'60vw'} maxW={'60vw'} justifyContent={'center'} >
        <Stack w={'900px'}>
          <Text fontSize={'6xl'}>
            Register
          </Text>

          <Card>
            <FormControl padding={'30px'} isRequired>
              <FormLabel fontSize={'2xl'}>Username</FormLabel>
              <Input type='text' placeholder='Username' />

              <FormLabel fontSize={'2xl'}>Password</FormLabel>
              <Input type='password' placeholder='Password'/>

              <FormLabel fontSize={'2xl'}>Confirm password</FormLabel>
              <Input type='password' placeholder='Confirm Password' />

              <FormLabel fontSize={'2xl'}>Phone number</FormLabel>
              <Input type='text' placeholder='Phone number' />

              <Flex alignItems="baseline">
                <FormLabel fontSize={'2xl'} >Line ID</FormLabel>
                <Text color="gray.500" fontSize="xl">(optional)</Text>
              </Flex>
              <Input type='text' placeholder='Line ID' />

              <Button mt={4} colorScheme="teal" size="lg" onClick={handleRegister}>
                Submit
              </Button>

            </FormControl>
          </Card>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default Register;
