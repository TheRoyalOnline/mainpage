import React, { useEffect, useState } from "react";
import logo from './imgs/logo.png';
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ForceDisconnect } from "./Game";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GetUserCredits } from "./API";

export const Menu = (props) => {

    const navigate = useNavigate();
    const cookie = new Cookies();
    var isLogged = cookie.get('userdata') !== undefined;
    const [credits, setCredits] = useState([]);
    const [userdata, setUserdata] = useState("");

    useEffect(() => {
        GetCredits();
        const intervalId = setInterval(GetCredits, 10000);

        return () => clearInterval(intervalId);
    }, []);

    async function GetCredits() {
        if (!isLogged) return;

        setUserdata(cookie.get('userdata').username);
        const cre = await GetUserCredits(cookie.get('userdata').iduser);
        setCredits(cre);
    }

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
        window.location.reload();
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary navbar-dark">
            <Container>
                <Navbar.Brand >
                    <div className="p-4 text-white navbar-brand d-flex">
                        <Link to="/"><img src={logo} width="200px" alt="logo" /></Link>
                        {
                            isLogged ? (<div className="text-white align-self-center"><b>{userdata}</b><br></br>Créditos: <b>{credits.credits}</b></div>) : null
                        }

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
                                    <Nav.Link onClick={ForceQuitRoom} ><span className="btn btn-outline-danger">Cerrar sesión</span></Nav.Link>
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