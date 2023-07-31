import { Button, Card, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const handleButtonClick = ()=>{
  alert('hello bitchass')
}

function Login() {
  return (
    <Flex h={'100dvh'}justifyContent={'center'} bg={'black'}>
      <Card my={'auto'}  justify={'center'} padding={'2.5vw'}>
        <Flex flexDirection={'column'}>
  
        <Text textAlign={'center'} fontSize={'2xl'}>Member Login</Text>
        
        <FormControl padding={'1vw'} isRequired>

          <FormLabel padding={'0.5vh'}>Username</FormLabel>
          <Input placeholder='Username' marginBottom={'1vw'}/>

          <FormLabel>Password</FormLabel>
          <Input placeholder='Password' />

          <Flex justifyContent={'center'} mt={'4'} flexDirection={'column'}>

          <Button colorScheme="teal" size="md" onClick={handleButtonClick}>
                login
          </Button>

          <Text fontSize={'1xl'} textAlign={'center'} mt={2}>
            Don't have an account?{' '}
            <Text color={'teal.500'} textDecoration={'underline'} as={Link} to='/register'> Register now </Text>
          </Text>

          </Flex>
        </FormControl>
        
        </Flex>
        
      </Card>
    </Flex>
  )
}

export default Login