import React, { useEffect } from "react";
import logo from './imgs/logo.png';
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ForceDisconnect } from "./Game";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaWindowClose } from "react-icons/fa";
import {BiExit} from "react-icons/bi"

export const Menu = (props) => {

    const navigate = useNavigate();
    const cookie = new Cookies();
    var isLogged = cookie.get('userdata') !== undefined;

    function Signup() {
        navigate('/Singup');
    }

    function Profile() {
        navigate('/Profile');
    }

    function Operations() {
        navigate('/Operations');
    }

    function Logout() {
        cookie.remove('userdata');
        isLogged = false;
        navigate('/');
    }

    async function ForceQuitRoom() {
        const res = await ForceDisconnect();
        navigate('/');
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary navbar-dark">
            <Container>
                <Navbar.Brand >
                    <div className="p-4 text-white navbar-brand">
                        <Link to="/"><img src={logo} width="100px" alt="logo" /></Link>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {
                    !isLogged ?
                        (
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mx-auto">

                                    <Nav.Link onClick={Signup} className="text-white">Registrarse</Nav.Link>
                                    <Nav.Link onClick={props.handler} className="text-white">Iniciar sesión</Nav.Link>
                                </Nav>

                            </Navbar.Collapse>
                        ) : (
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mx-auto">

                                    <Nav.Link onClick={ForceQuitRoom} className="text-white"><span className="">Forzar cierre</span></Nav.Link>
                                    <Nav.Link onClick={Profile} className="text-white">Perfil</Nav.Link>
                                    <Nav.Link onClick={Operations} className="text-white">Operaciones</Nav.Link>
                                    <Nav.Link onClick={Logout} className="text-white"><BiExit /></Nav.Link>

                                </Nav>

                            </Navbar.Collapse>
                        )
                }

            </Container>
        </Navbar>
    );
};

export default Menu;