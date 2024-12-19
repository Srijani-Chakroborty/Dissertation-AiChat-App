import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import {openain} from "../index.js"

dotenv.config();
const router=express.Router();
const chatContexts = {};
router.post("/text",async(req,res)=>{
    try{
        const {text,activeChatId}= req.body;
        //console.log("req.body:",req.body)
        if (!chatContexts[activeChatId]) {
          chatContexts[activeChatId] = [];
        }
        chatContexts[activeChatId].push({ role: "user", content: text });

        const response = await openain.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{role: "system", content: "You are gpt-3.5-turbo."},
            { role: "user", content: text },
            ...chatContexts[activeChatId],],
            temperature: 0.7
          });

          // const response = await openain.chat.completions.create({
          //   model: "gpt-4-turbo",
          //   messages: [
          //     {
          //       "role": "user",
          //       "content": text,
          //     }],
          //      "max_tokens": 300
          //   });
          const botMessage = response.choices[0].message.content;
          chatContexts[activeChatId].push({ role: "assistant", content: botMessage });

          await axios.post(
            `https://api.chatengine.io/chats/${activeChatId}/messages/`,
            { text: response.choices[0].message.content },
            {
              headers: {
                "Project-ID": process.env.PROJECT_ID,
                "User-Name": process.env.BOT_USER_NAME,
                "User-Secret": process.env.BOT_USER_SECRET,
              },
            }
          );

        console.log("text",text)
        res.status(200).json({text: response.choices[0].message.content})
    }catch(error){
        console.error("error",error);
        res.status(500).json({error:error.message})
    }
})


export default router