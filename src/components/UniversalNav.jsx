import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { List, ListItem, Text } from '@chakra-ui/layout';
import AdminNavbar from './AdminNavbar';
import UserNavbar from './UserNavbar';
import Navbar from './Navbar';

function UniversalNav() {

    const [userRole , setUserRole] = useState("");


    useEffect(() => {
        const storedUserRole = Cookies.get("userRole");
        if(storedUserRole){
            setUserRole(storedUserRole);
        }
    }, [])

  return (
    <>
      
        { userRole ==='1' &&(
            <UserNavbar/>
        )}

        { userRole === '2' && (
            <AdminNavbar/>
        )}

        { !userRole && (
          <Navbar/>
        )}
    </>
  )
}

export default UniversalNav