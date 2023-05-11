import React, { useRef, useState } from "react";
import logo from './imgs/logo.png';
import { Modal } from "react-bootstrap";
import * as API from './API';
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";



export const Navbar = () => {
    const userRef = useRef(null);
    const passRef = useRef(null);

    const [show, setShow] = useState(false);
    const initialValues = { username: "", password: "" };
    const [user, setUser] = useState(initialValues); //variable y su setter
    const [rememberme, setRemember] = useState(false);
    const year = new Date().getFullYear();

    const TryLogin = async () => {
        try {
            const res = await API.GetUser(user.username.trim(), user.password);
            if (res)
            {
                setShow(false);
                window.location.reload();
            }
            else {
                userRef.current.classList.add("is-invalid");
                passRef.current.classList.add("is-invalid");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const Showing = () => {
        setShow(!show);
    }

    const OnSubmit = event => {
        event.preventDefault();
        try {
            TryLogin();
        } catch (error) {
            console.log(error);
        }
    };

    const InputChangeEvent = event => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    function CheckedEvent(event) {
        setRemember(event.target.checked);
    };

    function GoToSingup(event) {
        setShow(false);
        navigate("/singup");
    }



    const navigate = useNavigate();
    const cookie = new Cookies();
    var isLogged = cookie.get('isLogged');

    // useEffect(() => {
    //     if (isLogged === undefined)
    //         isLogged = false;
    // });

    function Signup() {
        setShow(false);
        navigate('/Singup');
    }

    function Profile() {
        setShow(false);
        navigate('/Profile');
    }

    function Logout() {
        cookie.remove('isLogged');
        isLogged = false;
        window.location.reload();
    }

    function Show() {
        setShow(true);
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
                                    <button className="btn btn-success text-white" onClick={Show}>Iniciar sesión</button>
                                </div>
                            ) : (
                                <div>
                                    <button className="btn btn-success text-white" onClick={Profile}>Mi perfil</button>
                                    <button className="btn btn-outline-success text-white mx-2" onClick={Logout}>Salir</button>
                                </div>

                            )
                    }
                </div>

                <Modal backdrop="static" show={show} onHide={Showing} centered={true}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        {/* <Login /> */}
                        <main className='form-signin w-100 m-auto text-center'>
                            <form onSubmit={OnSubmit}>
                                <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                                <h1 className="h3 mb-3 fw-normal">Iniciar sesión</h1>

                                <div className="form-floating">
                                    <input ref={userRef} type="text" className="form-control" id="floatingInput" placeholder="User name" name='username' value={user.username} onChange={InputChangeEvent} required />
                                    <label htmlFor="floatingInput">Nombre de usuario</label>
                                </div>
                                <div className="form-floating">
                                    <input ref={passRef} type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' value={user.password} onChange={InputChangeEvent} required />
                                    <label htmlFor="floatingPassword">Contraseña</label>
                                    <div className="invalid-feedback" id="userfeedback">
                                        Usuario o contraseña invalidos.
                                    </div>
                                </div>

                                <div className="checkbox mb-3 mt-3">
                                    <label>
                                        <input type="checkbox" checked={rememberme} onChange={CheckedEvent} /> Recuerdame
                                    </label>
                                </div>
                                <button className="w-100 btn btn-lg btn-dark" type="submit">Iniciar</button>
                                <div className='pt-4'>
                                    <button className="w-100 btn btn-sm btn-dark" type="button" onClick={GoToSingup}> Registrarse</button>
                                </div>
                                <div className='pt-1'>
                                    <button className="w-100 btn btn-sm btn-dark text-white" type="button">¿Olvidaste tu contraseña?</button>

                                </div>
                                <p className="mt-5 mb-3 text-body-secondary ">© Tupapõ Games {year} </p>
                            </form>
                        </main>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        </nav>

    );
};

export default Navbar;