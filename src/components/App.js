
import { Route, Routes } from 'react-router-dom';
import React, { Component, useEffect } from 'react';


import MainPage from './Slots';
import { SignUp } from './Signup';
import {Menu} from './Navbar';
import Profile from './Profile';
import Login from './Login';
import { Recover } from './Recover';
import { Operations } from './Operations';
import { useState } from 'react';
import { Movements } from './Movements';
import {EditUser} from './EditUsers';
import EditGame from './EditGame';
import Statistics from './Statistics';
import StatisticsDetails from './StatisticsDetails';

export const App = () => {
    const [show, setShow] = useState(false);
    
    function handleLogin(){
        setShow(!show);
    }

    return (
        <div className='containter-fluid'>
            <Menu handler={handleLogin}/>
            <Login show={show} handler={handleLogin}/>
            <Routes>
                <Route exact path='/' element={<MainPage handler={handleLogin} />} />
                <Route exact path='/Singup' element={<SignUp />} />
                <Route exact path='/Profile' element={<Profile />} />
                <Route exact path='/Recover' element={<Recover />} />
                <Route exact path='/Operations' element={<Operations />} />
                <Route exact path='/Operations/Movements' element={<Movements />} />
                <Route exact path='/Operations/Editusers' element={<EditUser />} />
                <Route exact path='/Operations/Editgame' element={<EditGame />} />
                <Route exact path='/Operations/Statistics' element={<Statistics />} />
                <Route exact path='/Operations/Details' element={<StatisticsDetails />} />
            </Routes>
        </div>
    );


}

export default App;

