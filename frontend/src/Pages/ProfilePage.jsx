import React, { use, useEffect, useState } from 'react'


import Service from '../utils/http'
import { Avatar, Center, Container, Image, Text } from '@mantine/core';
import { IconBoxPadding } from '@tabler/icons-react';
const obj = new Service();


export default function Profile() {


   const [user, setUser] = useState({})
   const getProfileData = async () => {
     try {
       let data = await obj.get("user/me")
       setUser(data.user)
       console.log(data);
     } catch (error) {
       console.log(error);
     }
   }
   useEffect(() => {


       getProfileData();
   }, [])
   


   return (
     <div>
           {
             <Center style={{height:600}} bg="yellow
             ">
             <Container>
               <Center>
          <Avatar src="https://lh3.googleusercontent.com/a/ACg8ocII0BGkPM9UEgTFgYMdVIOEFV8P1CHiF3QXtfTDvCM0qMyxBg=s96-c" size= "100"/>        
          </Center>
         <Center>
           <Text color='violet' size={"lg"}> {user?.name} </Text>
         </Center><Center>
             <Text>MY EMAIL: {user?.email}</Text>
         </Center>
           <Center> 
            <Text>Account created on : <br></br></Text><Text color='violet'>{user?.createdAt}</Text>
           </Center>
           </Container>
           </Center>  
           }
       </div>
   )
}
