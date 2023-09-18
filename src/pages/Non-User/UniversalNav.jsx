import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

function UniversalNav() {

    const cookies = new Cookies();
    const [userRole , setUserRole] = useState("");


    useEffect(() => {
        const storedUserRole = cookies.get("userRole");
        if(storedUserRole){
            setUserRole = storedUserRole;
        }
    }, [])

  return (


    <div>UniversalNav</div>


  )
}

export default UniversalNav