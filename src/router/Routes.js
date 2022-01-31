import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from 'page/login/Login'
import './Routes.css'

const Router = () => {
  return (
    <div className="routes">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="users/*" element={<Users />} /> */}
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default Router
