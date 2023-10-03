import React, { useEffect } from "react";
import logo from './imgs/logo.png';
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ForceDisconnect } from "./Game";

export const Navbar = (props) => {

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
        <nav className="navbar navbar-expand-lg pb-5">
            <div className="container">
                <div className="bg-black p-4 text-white roundlogo navbar-brand">
                    <Link to="/"><img src={logo} width="100px" alt="logo" /></Link>
                </div>
                <div className="navbar-nav ms-auto">
                    {
                        !isLogged ?
                            (
                                <div>
                                    <button className="btn btn-outline-success text-white mx-2" onClick={Signup}>Registrarse</button>
                                    <button className="btn btn-success text-white" onClick={props.handler}>Iniciar sesión</button>
                                </div>
                            ) : (

                                <div>
                                    <button className="btn btn-outline-success text-white mx-2" onClick={ForceQuitRoom}>Forzar cierre</button>
                                    <button className="btn btn-success text-white mx-2" onClick={Profile}>Mi perfil</button>
                                    <button className="btn btn-success text-white mx-2" onClick={Operations}>Operaciones</button>
                                    <button className="btn btn-outline-success text-white mx-2" onClick={Logout}>Salir</button>
                                </div>

                            )
                    }
                </div>
            </div>
        </nav>

    );
};

export default Navbar;