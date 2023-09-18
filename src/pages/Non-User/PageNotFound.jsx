import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../../components/Navbar'

function PageNotFound() {
  return (
    <>
    <Navbar/>
    <Flex mx={'auto'} justify={'center'} my={'40dvh'}>
        <Text fontSize={'6xl'}>
            Page not found
        </Text>
    </Flex>
    </>
  )
}

export default PageNotFound