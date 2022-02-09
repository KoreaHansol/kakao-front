import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from 'page/login/Login'
import './Routes.css'
import Room from 'page/room/Room'
import SignUp from 'page/singup/SignUp'
import Chat from 'page/chat/Chat'
import MakeRoom from 'page/makeRoom/MakeRoom'

const Router = () => {
  return (
    <div className="routes">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/room" element={<Room/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/room/makeroom" element={<MakeRoom/>} />
          <Route path="/chat" element={<Chat/>} />
          {/* <Route path="users/*" element={<Users />} /> */}
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default Router
