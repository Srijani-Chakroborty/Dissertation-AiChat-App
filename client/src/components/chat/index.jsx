//import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import CustomeHeader from "@/components/customHeader";
import StandardMessageForm from "@/components/customMessageForms/StandardMessageForm";
import Ai from "@/components/customMessageForms/Ai"

const Chat = ({user, secret, setUser, setSecret}) => {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    user,
    secret
  );
  const handleLogout = () => {
    setUser(null);
    setSecret(null);
  };
  return (
    <div style={{ flexBasis: "100%" }}>
       <button
        onClick={handleLogout}
        className="logout"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "10px 20px",
          // backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 1000,
          fontWeight: "bold",
          fontSize: "14px"
        }}
      >
        Logout
      </button>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <CustomeHeader chat={chat} />}
        renderMessageForm={(props) => {
          if(chatProps.chat?.title.startsWith("AiChat_")){
            return <Ai props={props} activeChat={chatProps.chat}/>
          }
          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
        //renderMessage={(props)=>{console.log(props); return (<></>)}}
      />
    </div>
  );
};

export default Chat;
