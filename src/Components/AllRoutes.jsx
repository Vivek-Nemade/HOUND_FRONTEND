import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Homepage'
import Login from '../Pages/Login'
import Signup from '../Pages/SignUp'
import Navbar from './Navbar'
import Profile from "../Pages/Profile/index"
import TestUser from './TestUser'

function AllRoutes() {
  return (
    <>
    <Navbar/>
        <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/user' element={<TestUser/>}/>
        </Routes>
    </>
  )
}

export default AllRoutes