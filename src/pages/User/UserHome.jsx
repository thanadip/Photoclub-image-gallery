import React, { useState, useEffect } from 'react';
import UserNavbar from '../../components/UserNavbar';
import axios from 'axios';
import { Flex, List, ListItem, Text, Link, Image } from '@chakra-ui/react';

function UserHome() {

  return (
    <>
      <UserNavbar />
    </>
  );
}

export default UserHome;
