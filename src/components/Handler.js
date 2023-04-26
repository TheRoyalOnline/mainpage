import React from 'react'
import Login from './Login';
import Navbar from './Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cookie from 'universal-cookie';
import { ShowLogin } from './SweetLogin';

export const Handler = (props) => {
    const cookie = new Cookie();    
    const isLogged = cookie.get('isLogged');
    
    return (
        <button onClick={ShowLogin}>Abrir formulario</button>
    )
    if(!isLogged)
    {
    }
}
