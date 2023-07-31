import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Flex,
  Text,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lineID, setLineID] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {

    try {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      const response = await axios.post('http://localhost:5001/register', {
        username,
        user_email: email,
        password,
        phone_number: phoneNumber,
        line_id: lineID,
      });

      if (response.status === 201) {
        alert('Registration successful');
        navigate('/login');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again later.');
    }
  };


  return (
    <Flex h={'100dvh'} justify={'center'} backgroundColor={'teal.400'}>
      <Flex mr={'auto'}>
        <Stack my={'auto'} mx={'5vw'} pb={'10vw'}>
          <Text fontSize={'6xl'} textAlign={'left'}>
            Create an account
          </Text>
          <Text fontSize={'3xl'} textAlign={'left'}>
            &nbsp;&nbsp;&nbsp;Make your own account for private contacting!{' '}
          </Text>
        </Stack>
      </Flex>

      <Flex minW={'60vw'} maxW={'60vw'} justifyContent={'center'}>
        <Stack w={'60%'} >
          <Text fontSize={'6xl'} mb={'5vh'} mt={'5vh'} >  
            Register
          </Text>

          <Card>
            <FormControl padding={'5%'} isRequired>
              <FormLabel fontSize={'2xl'}>Username</FormLabel>
              <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>

              <FormLabel fontSize={'2xl'}>Password</FormLabel>
              <Input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

              <FormLabel fontSize={'2xl'}>Confirm password</FormLabel>
              <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>

              <FormLabel fontSize={'2xl'}>Email</FormLabel>
              <Input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

              <FormLabel fontSize={'2xl'}>Phone number</FormLabel>
              <Input type="text" placeholder="Phone number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>

              <Flex alignItems="baseline">
                <FormLabel fontSize={'2xl'}>Line ID</FormLabel>
                <Text color="gray.500" fontSize="xl">
                  (optional)
                </Text>
              </Flex>
              <Input type="text" placeholder="Line ID" value={lineID} onChange={(e) => setLineID(e.target.value)} />

              <ButtonGroup>

                <Button mt={4} colorScheme="teal" size="lg" onClick={handleRegister}>
                  Submit
                </Button>
                
                <Link to="/Index">
                  <Button mt={4} colorScheme="gray" size="lg" >
                    <Text color={'gray'}> Cancle </Text>
                  </Button>
                </Link>

              </ButtonGroup>
              
              <Text mt={'4'} textAlign={'center'}> already have an account?{' '}
              <Text textDecoration="underline" color={"teal.500"} as={Link} to='/login'>Log in</Text> 
              </Text>

            </FormControl>
          </Card>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default Register;
