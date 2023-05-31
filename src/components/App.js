
import { Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';


import MainPage from './Slots';
import { SignUp } from './Signup';
import Navbar from './Navbar';
import Profile from './Profile';
import Login from './Login';
import { Recover } from './Recover';
import { useState } from 'react';

export const App = () => {
    const [show, setShow] = useState(false);

    function handleLogin(){
        setShow(!show);
    }

    return (

        <div className='containter-fluid'>
            <Navbar show={show} handler={handleLogin}/>
            <Login show={show} handler={handleLogin}/>
            <Routes>
                <Route exact path='/' element={<MainPage handler={handleLogin}/>} />
                <Route exact path='/Singup' element={<SignUp />} />
                <Route exact path='/Profile' element={<Profile />} />
                <Route exact path='/Recover' element={<Recover />} />
            </Routes>
        </div>
    );


}

export default App;

