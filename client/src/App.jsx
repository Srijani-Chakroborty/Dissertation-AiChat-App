//import { useState } from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Chat from "@/components/chat";
import { useState, useEffect } from "react";
import Login from "@/components/login"

function App() {
  const [user, setUser]=useState(null);
  const [secret, setSecret]=useState(null);
  const isAuth=Boolean(user)&& Boolean(secret);
  useEffect(() => {
    console.log("Checking login status...");
    const loginTime = localStorage.getItem("loginTime");
    if (loginTime) {
      const lastLogin = new Date(parseInt(loginTime));
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      if (lastLogin < sevenDaysAgo) {
        console.log("Login expired, clearing user data...");
        localStorage.removeItem("loginTime");
        setUser(null);
        setSecret(null);
      } else {
        console.log("User still logged in.");
        const storedUser = localStorage.getItem("user");
        const storedSecret = localStorage.getItem("secret");
        setUser(storedUser);
        setSecret(storedSecret);
      }
    } else {
      console.log("No login data found.");
    }
  }, []);

  console.log("Rendering App with user:", user);
  
  return (
      <div className='app'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth?(<Navigate to="/chat"/>):(<Login setUser={setUser} setSecret={setSecret}/>)}/>
            <Route path='/chat' element={isAuth?(<Chat user={user} secret={secret} setUser={setUser} setSecret={setSecret}/>):(<Navigate to="/"/>)}/>
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App
