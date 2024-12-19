
//import { PaperAirplaneIcon, PaperClipIcon, XMarkIcon } from '@heroicons/react/24/solid';
// eslint-disable-next-line no-unused-vars
import React,{ useState } from 'react'
//import Dropzone from 'react-dropzone';
import MessageFormUI from './MessageFormUI';

const StandardMessageForm = ({props,activeChat}) => {
    // console.log('props',props)
    // console.log('activeChat',activeChat)
    const [message,setMessage]=useState('');
    const [attachment,setAttachment]=useState('');

    const handleChange=(e)=>setMessage(e.target.value)

    const handleSubmit=async()=>{
        const date=new Date();
        const adjustedDate = new Date(date.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000)).toISOString().replace("T"," ").replace("Z",`${Math.floor(Math.random()*1000)}+00:00`);
        console.log(new Date().toISOString());
        console.log(date)
        const at=attachment?[{blob:attachment,file:attachment.name}]:[];
        const form={
            attachments:at,
            created:adjustedDate,
            sender_username:props.username,
            text:message,
            activeChatId:activeChat.id,
        }
        props.onSubmit(form);
        setMessage("");
        setAttachment("");
    }

  return (
   <MessageFormUI
   setAttachment={setAttachment}
   message={message}
   handleChange={handleChange}
   handleSubmit={handleSubmit}
   />
   
      
  )
}

export default StandardMessageForm;