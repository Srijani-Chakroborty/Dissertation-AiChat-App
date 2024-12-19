import {useState} from 'react'
import MessageFormUI from './MessageFormUI'
import { usePostAiTextMutation } from '@/state/api';

const Ai = ({props,activeChat}) => {
    const [message,setMessage]=useState('');
    const [attachment,setAttachment]=useState('');
    const [trigger]=usePostAiTextMutation();

    const handleChange=(e)=>setMessage(e.target.value)
  //   const getCurrentISTTimestamp = () => {
  //     const now = new Date();
  //     const ISTOffset = 330 * 60000; // IST is UTC+5:30
  //     const ISTTime = new Date(now.getTime() + ISTOffset);
  //     return ISTTime.toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
  // };

    const handleSubmit=async()=>{
        const date=new Date().toISOString().replace("T"," ").replace("Z",`${Math.floor(Math.random()*1000)}+00:00`)
        //const date=getCurrentISTTimestamp();
        const at=attachment?[{blob:attachment,file:attachment.name}]:[];
        const form={
            attachments:at,
            created:date,
            sender_username:props.username,
            text:message,
            activeChatId:activeChat.id,
        }
        props.onSubmit(form);
        trigger(form)
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

export default Ai