import React, { useEffect, useRef, useState } from "react";
import logo from './imgs/logo.png';
import { Modal } from "react-bootstrap";
import { Login } from "./Login";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { render } from "@testing-library/react";


export const Navbar = () => {
    const navigate = useNavigate();
    const cookie = new Cookies();
    var isLogged = cookie.get('isLogged');

    useEffect(() => {
        if (isLogged == undefined)
            isLogged = false;
    });

    function Signup() {
        navigate('/Singup');
    }

    function Logout() {
        cookie.remove('isLogged');
        isLogged = false;
        window.location.reload();
    }

    function Show() {

    }

    return (
        <nav className="navbar navbar-expand-lg pb-5">
            <div className="container">
                <div className="bg-black p-4 text-white roundlogo navbar-brand">
                    <Link to="/"><img src={logo} width="100px" /></Link>
                </div>
                <div className="navbar-nav ms-auto">
                    {
                        !isLogged ?
                            (
                                <div>
                                    <button className="btn btn-outline-success text-white mx-2" onClick={Signup}>Registrarse</button>
                                    <button className="btn btn-success text-white" onClick={Show}>Iniciar sesión</button>
                                </div>
                            ) : (
                                <div>
                                    <button className="btn btn-success text-white" onClick={Show}>Mi perfil</button>
                                    <button className="btn btn-outline-success text-white mx-2" onClick={Logout}>Salir</button>
                                </div>

                            )
                    }
                </div>

                <Login />
            </div>
            {/* <Modal backdrop="static" show={show} onHide={ShowModal} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Login />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal> */}
        </nav>

    );
};

export default Navbar;