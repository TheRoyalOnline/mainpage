import React from 'react'
import Login from './Login';
import Navbar from './Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cookie from 'universal-cookie'

export const Handler = (props) => {
    const cookie = new Cookie();    
    const isLogged = cookie.get('isLogged');
    if(!isLogged)
    {
        return <Login/>
    }else{  
        return(
            <BrowserRouter>
                <Navbar/> 
                <div className='container'>
                    <Routes>
                    {/* <Route path='/' Component={Login}/> */}
                    </Routes>
                </div>
            </BrowserRouter>
        )

    }
}
