import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { RecoverPassword } from "./API";

export const Recover = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    function OnSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        RecoverPassword(formData.get('username'), formData.get('email'));
        setShow(true);
    }

    function OnChangeEvent(event) {
        if (event.target.name === 'username')
            setUsername(event.target.value);
        else
            setEmail(event.target.value);
    }

    function GoToIndex(event) {
        navigate('/');
    }


    return (
        <form className='pt-2 text-white container register' onSubmit={OnSubmit}>
            <h1 className='text-center '>Recuperar contraseña</h1>
            <div className='card border-success text-white bg-transparent mt-5'>

                <h5 className="card-header border-success text-white pt-4">Datos de sesión</h5>

                <div className='flex-column justify-content-center p-3'>

                    <div className="justify-content-center  pt-3">
                        <label htmlFor="validationServerUsername">Usuario</label>
                        <div className="input-group ">
                            <div className="input-group-prepend ">
                                <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><FaUser /></span>
                            </div>
                            <input type="text" className="form-control bg-dark border-success text-white" id="idUser"
                                placeholder="Usuario" aria-describedby="inputGroupPrepend3" required name='username' value={username} onChange={OnChangeEvent} autoComplete='off' />

                        </div>


                        <label htmlFor="validationServerUsername">Email</label>
                        <div className="input-group ">
                            <div className="input-group-prepend ">
                                <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><FaEnvelope /></span>
                            </div>
                            <input type="email" className="form-control bg-dark border-success text-white" id="idUser"
                                placeholder="Email" aria-describedby="inputGroupPrepend3" required name='email' value={email} onChange={OnChangeEvent} autoComplete='off' />

                        </div>

                    </div>

                </div>

                <h5 className="card-header border-success text-white pt-4"></h5>
                <div className='text-center mt-3 mb-4'>
                    <div className="form-group ">

                        <div className='d-flex flex-column container w-75'>
                            <button className="btn btn-success mt-3" type="submit">Recuperar</button>
                        </div>

                    </div>
                </div>
            </div>

            <Modal backdrop="static" show={show} centered={true}>
                <Modal.Header>
                    <Modal.Title>Contraseña recuperada! 😉</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    Verifica tu correo electronico para finalizar el procedimiento.
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success mt-3" type="button" onClick={GoToIndex}>Volver</button>
                </Modal.Footer>
            </Modal>
        </form>
    );
};