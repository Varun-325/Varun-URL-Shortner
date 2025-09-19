import { Button, Container, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import Service from '../utils/http'
const obj = new Service();


export default function UrlForm(props) {
   const generateShortUrl = async(data) => {
       try {
           let response = await obj.post("s", data);
           console.log(response);
           props.setResponse(response);
       }catch (error) {
           console.log(error);
       }
   }


   const [data, setData] = useState({
       "originalUrl": "",
       "expiresAt": "",
       "title": "",
       "customUrl": ""
   })


      return (
         <Container size={"xs"}>
             <TextInput
                 mt={"xl"}
                 withAsterisk
                 size="lg"
                 radius="lg"
                 label="Original URL"
                 placeholder="Enter URL to be shortened"
                 onChange={(e)=>{
                         setData({...data, originalUrl : e.target.value})
                 }}
             />
              <TextInput
                 size="lg"
                 radius="lg"
                 label="Custom Url (Optional)"
                 placeholder="Enter Custom URL"
                 onChange={(e)=>{
                         setData({...data, customUrl : e.target.value})
                 }}
             />
             <TextInput
                 size="lg"
                 radius="lg"
                 label="Title (Optional)"
                 placeholder="Enter Title for the URL"
                 onChange={(e)=>{
                         setData({...data, title : e.target.value})
                 }}
             />
             <TextInput
                 type='date'
                 size="lg"
                 radius="lg"
                 label="Expiry Date (Optional)"
                 placeholder="Choose Expiry Date"
                 onChange={(e)=>{
                         setData({...data, expiresAt : e.target.value})
                 }}
             />


             <Button
             onClick={()=>{
               // console.log(data);
               generateShortUrl(data);
             }}
             disabled = {data?.originalUrl?.length>10?false:true}
             my="md" color={"red"}> Generate Short Url </Button>
 
         </Container>
     )
}