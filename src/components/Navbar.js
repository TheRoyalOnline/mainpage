import React, { useEffect } from "react";
import logo from './imgs/logo.png';
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ForceDisconnect } from "./Game";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

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

                <Navbar.Collapse id="basic-navbar-nav">
                    {
                        !isLogged ?
                            (
                                <Nav className="ms-auto">

                                    <Nav.Link onClick={Signup}><span className="btn btn-outline-success">Registrarse</span></Nav.Link>
                                    <Nav.Link onClick={props.handler}><span className="btn btn-success">Iniciar sesión</span></Nav.Link>
                                </Nav>
                            ) : (
                                <Nav className="ms-auto">

                                    <Nav.Link onClick={ForceQuitRoom} ><span className="btn btn-outline-danger">Forzar cierre</span></Nav.Link>
                                    <Nav.Link onClick={Profile}><span className="btn btn-outline-success">Perfil</span></Nav.Link>
                                    <Nav.Link onClick={Operations}><span className="btn btn-outline-success">Operaciones</span></Nav.Link>
                                    <Nav.Link onClick={Logout}><span className="btn btn-warning">Salir</span></Nav.Link>

                                </Nav>

                            )
                    }
                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
};

export default Menu;