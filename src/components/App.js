
import { Route, Routes } from 'react-router-dom';
import React, { Component, useEffect } from 'react';


import MainPage from './Slots';
import { SignUp } from './Signup';
import Navbar from './Navbar';
import Profile from './Profile';
import Login from './Login';
import { Recover } from './Recover';
import { Operations } from './Operations';
import { useState } from 'react';
import { Movements } from './Movements';

export const App = () => {
    const [show, setShow] = useState(false);
    
    function handleLogin(){
        setShow(!show);
    }

    return (
        <div className='containter-fluid'>
            <Navbar handler={handleLogin}/>
            <Login show={show} handler={handleLogin}/>
            <Routes>
                <Route exact path='/' element={<MainPage handler={handleLogin} />} />
                <Route exact path='/Singup' element={<SignUp />} />
                <Route exact path='/Profile' element={<Profile />} />
                <Route exact path='/Recover' element={<Recover />} />
                <Route exact path='/Operations' element={<Operations />} />
                <Route exact path='/Operations/Movements' element={<Movements />} />
            </Routes>
        </div>
    );


}

export default App;

