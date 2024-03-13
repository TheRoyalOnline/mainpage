import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Modal } from "react-bootstrap";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { GetUserDetails } from "./API";
import { UpdateByAdmin } from "./API";

export const EditUser = () => {
    
    const pass ={
        password:"",
        replypassword:""
    }
    const location = useLocation();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [user, setUser] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [confirm, setConfirm] = useState(false);
    const [password, setPassword] = useState(pass);

    const refBtnConfirm = useRef(null);
    const refBtnUpdate = useRef(null);
    
    useEffect(() => {
        Starting();
    }, []);

   function Starting() {
        const cookie = new Cookies();
        if (cookie.get("userdata") === undefined && cookie.get("userdata").role !== 1)
            navigate('/');
        
        const u = location.state.user;
        u.active = u.active === 1? true:false;
        setUser(u);   
    }


    function OnChange(e) {
        if(e.target.type === "checkbox"){
            setUser({ ...user, active: e.target.checked});
        }
        else    
            setUser({ ...user, [e.target.name]: e.target.value });
    }

    
    function OnChangePassword(e) {
        setPassword({...password, [e.target.name]:e.target.value});
    }

    async function Assign(e) {
        setShowModal(false);
        refBtnUpdate.current.disabled = false
    }

    function OnSubmit(e) {
        e.preventDefault();
        setShowConfirmDialog(true);
    }

    function CallModal() {
        setShowModal(!showModal);
    }

    async function ConfirmSubmit() {       
        refBtnConfirm.current.disabled = true;
        if (confirm) return;
        setConfirm(true);

        const up = await UpdateByAdmin(user, password.password);

        if (up) {
            setConfirm(false);
            setShowConfirmDialog(false);
            refBtnUpdate.current.disabled = false
        }
    }

    return (
        <div>
            <div className='pt-2 text-white container register'>
                <h1 className='text-center'>Editar usuario</h1>
                <form className='pt-2 text-white container register' name='assign' id="assign" onSubmit={OnSubmit}>
                    <div className='card border-success text-white bg-transparent'>
                        <h5 className="card-header border-success text-white">Usuario: <b className="text-success">{user.username}</b></h5>

                        <div className='flex-column justify-content-center pt-3'>
                            <div className="justify-content-center p-3">
                                <label htmlFor="user">Nombre</label>
                                <input id="user" className="form-control bg-dark border-success text-white" value={user.firstname} name="name" onChange={OnChange} required/>
                            </div>
                        </div>

                        <div className='flex-column justify-content-center'>
                            <div className="justify-content-center p-3">
                                <label htmlFor="user">Apellido</label>
                                <input id="user" className="form-control bg-dark border-success text-white" value={user.surname} name="surname" onChange={OnChange} required/>
                            </div>
                        </div>

                        <div className='flex-column justify-content-center'>
                            <div className="justify-content-center p-3">
                                <label htmlFor="user">Nro. CI</label>
                                <input id="user" className="form-control bg-dark border-success text-white" value={user.dni} type="number" name="dni" onChange={OnChange} required/>
                            </div>
                        </div>

                        <div className='flex-column justify-content-center'>
                            <div className="justify-content-center p-3">
                                <label htmlFor="user">Email</label>
                                <input id="mail" className="form-control bg-dark border-success text-white" value={user.email} type="email" onChange={OnChange} required/>
                            </div>
                        </div>

                        <div className='flex-column justify-content-center'>
                            <div className="justify-content-center p-3">
                                <label htmlFor="idRol">Nuevo rol</label>
                                <select className="form-select bg-dark border-success text-white" id="idRol" value={user.role} required name='role' onChange={OnChange}>
                                    <option value={5}>Cliente</option>
                                    <option value={4}>Vendedor</option>
                                    <option value={3}>Operador</option>
                                    <option value={2}>Caja</option>
                                    <option value={1}>Administrador</option>
                                </select>

                            </div>
                        </div>

                        <div className='flex-column justify-content-center'>
                            <div className="justify-content-center p-3">
                                <label htmlFor="check">Activo</label>
                                <div className="form-check form-switch">
                                    <input id="check" className="form-check-input" checked={user.active} type="checkbox" name="active" onChange={OnChange}/>
                                </div>
                            </div>
                        </div>
                        <h5 className="card-header border-success"></h5>
                        <div className='flex-column justify-content-center'>
                            <div className="justify-content-center p-3">
                                <label htmlFor="user">Cambiar contraseña</label>
                                <input id="user" className="form-control bg-dark border-success text-white" name="password" value={password.password} type="password"  onChange={OnChangePassword}/>
                            </div>
                        </div>
                        <div className='flex-column justify-content-center'>
                            <div className="justify-content-center p-3">
                                <label htmlFor="user">Repetir contraseña</label>
                                <input id="user" className="form-control bg-dark border-success text-white" name="replypassword" value={password.replypassword} type="password"  onChange={OnChangePassword}/>
                            </div>
                        </div>
                        <h5 className="card-header border-success text-white pt-4"></h5>
                        <div className='text-center mt-3 mb-4'>
                            <div className="form-group ">
                                <div className='flex-column flex-column container'>
                                    <button ref={refBtnUpdate} className="btn btn-success mt-3" type="submit">Actualizar</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <Modal className="container-fluid" backdrop="static" show={showConfirmDialog} onHide={() => setShowConfirmDialog(false)} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmacion 🤔</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <p>Esta seguro que desea confirmar la operacion?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button ref={refBtnConfirm} className="btn btn-success" onClick={ConfirmSubmit}>Confirmar</button>
                </Modal.Footer>
            </Modal>

        </div>

    );
};

export default EditUser;