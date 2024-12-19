import React,{useState} from 'react'
import {ChatBubbleLeftRightIcon, PhoneIcon} from "@heroicons/react/24/solid";

const CustomeHeader = ({chat}) => {
  // const [searchKeyword, setSearchKeyword] = useState('');
  // const [searchedChat, setSearchedChat] = useState(null);
  const handleCall = () => {
    // Replace '1234567890' with the phone number you want to call
    window.location.href = 'tel:1234567890';
  };
  // const handleSearch = () => {
  //   // Perform search logic here
  //   const foundChat = chat.find(chat => chat.toLowerCase().includes(searchKeyword.toLowerCase()));
  //   if (foundChat) {
  //     setSearchedChat(foundChat);
  //   } else {
  //     setSearchedChat(null);
  //     alert('Chat not found');
  //   }
  // };
  const date=new Date()
  const ISTOffset = 330 * 60000; // Offset for IST in milliseconds (5 hours 30 minutes)
const ISTDate = new Date(date.getTime() + ISTOffset);

// Extract date, time, and milliseconds
const formattedDate = ISTDate.toISOString().substring(0, 10); // Extract "2024-04-12"
const formattedTime = ISTDate.toISOString().substring(11, 23); // Extract "12:24:24.439"

// Combine date, time, milliseconds, and timezone offset
const formattedDateTime = formattedDate + " " + formattedTime + "+05:30";
  // chat.description=formattedDateTime;
  console.log(typeof(chat.description));
  return (
    <div className='chat-header'>
        <div className="flexbetween">
            <ChatBubbleLeftRightIcon className='icon-chat'/>
            <h3 className="header-text">{chat.title}</h3>
        </div>
        {/* <div className="flexbetween">
        <input
          type="text"
          placeholder="Search chat"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div> */}
        <div className="flexbetween" onClick={handleCall}>
            <PhoneIcon className='icon-phone'/>
            {chat.description!=="⬅️ ⬅️ ⬅️"?
            (<p className="header-text">{'Active Chat'}</p>):
            (<p className='header-text'>No chat selected</p>)}
        </div>
    </div>
  )
}

export default CustomeHeader