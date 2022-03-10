import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../page/login'
import './Routes.css'
import Room from '../page/room'
import SignUp from '../page/singup'
import Chat from '../page/chat'
import MakeRoom from '../page/makeRoom'

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
