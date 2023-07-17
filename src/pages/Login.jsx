import { Button, Card, Flex, FormControl, FormLabel, Input, Link, Text } from '@chakra-ui/react'
import React from 'react'

function Login() {
  return (
    <Flex h={'100vh'}justifyContent={'center'} bg={'black'}>
      <Card my={'auto'}  justify={'center'} padding={'2.5vw'}>
        <Flex flexDirection={'column'}>
  
        <Text textAlign={'center'} fontSize={'2xl'}>Member Login</Text>
        
        <FormControl padding={'1vw'} isRequired>

          <FormLabel padding={'0.5vh'}>Username</FormLabel>
          <Input placeholder='First name' marginBottom={'1vw'}/>

          <FormLabel>Password</FormLabel>
          <Input placeholder='First name' />

          <Flex justifyContent={'center'} mt={'4'} flexDirection={'column'}>

          <Button colorScheme="teal" size="md" >
                login
          </Button>

          <Text fontSize={'1xl'} textAlign={'center'} mt={2}>
            Don't have an account?
            <Link color="teal.500" href="/register"> Register now </Link>
          </Text>

          </Flex>
        </FormControl>
        
        </Flex>
        
      </Card>
    </Flex>
  )
}

export default Login