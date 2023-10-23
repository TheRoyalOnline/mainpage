import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Modal } from "react-bootstrap";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FindUser } from "./API";
import { SetRole } from "./API";

export const EditUser = () => {
    const [errMessage2, setErrMessage2] = useState('');
    const [showTable, setShowTable] = useState(true);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [user, setUser] = useState([]);
    const [userSearch, setUserSearch] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [userdata, setUserdata] = useState([]);
    const navigate = useNavigate();
    const [confirm, setConfirm] = useState(false);

    const refBtnConfirm = useRef(null);


    const methods = {
        role: value => {
            setUser({ ...user, role: value })
        },
        dni: value => {
            setUserSearch({ ...userSearch, dni: value })
        }

    }
    useEffect(() => {
        Starting();
    }, []);

    async function Starting() {
        const cookie = new Cookies();
        if (cookie.get("userdata") === undefined && cookie.get("userdata").role !== 1)
            navigate('/');

        setUserdata(cookie.get('userdata'));
        setUser({ ...user, rolefrom: cookie.get('userdata').role })
    }


    function OnChange(e) {
        methods[e.target.name](e.target.value);
    }


    async function Assign(e) {
        setUser(u => ( {...u, ...userSearch}));
        setShowModal(false);
        setShowTable(true);
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
        
        var res = 0;
        res = await SetRole(user);
        
        Starting();
        refBtnConfirm.current.disabled = false;
        setConfirm(false);
        setShowConfirmDialog(false);
    }

    async function Search() {
        setErrMessage2('');
        const u = await FindUser(userSearch.dni);

        if (u.iduser !== undefined) {
            if (userdata.iduser === u.iduser) {
                setErrMessage2('No se puede interactuar con uno mismo.');
                setShowModal(false);
                return;
            }
            if (userdata.role > u.role) {
                setErrMessage2('No se puede interactuar con usuarios de rol superior.');
                setShowModal(false);
                return;
            }

            setUserSearch(u);
            setShowTable(false);
        }
    }

    return (
        <div>
            <div className='pt-2 text-white container register'>
                <h1 className='text-center'>Editar usuario</h1>
                <form className='pt-2 text-white container register' name='assign' id="assign" onSubmit={OnSubmit}>
                    <div className='card border-success text-white bg-transparent mt-5'>
                        <h5 className="card-header border-success text-white">Buscar</h5>

                        <div className='d-flex justify-content-center p-3'>
                            <div className="justify-content-center pt-3">
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
                        <div className='d-flex justify-content-center'>
                            <div className="form-inline">
                                <label htmlFor="label1 ">Usuario:</label>
                                <label className="p-3" id="label1"><b>{user.iduser != undefined ? '(' + user.dni + ') ' + user.surname + ', ' + user.name : 'Ninguno'}</b></label>
                            </div>
                        </div>
                        <h5 className="card-header border-success text-white pt-4"></h5>
                        <div className='text-center mt-3 mb-4'>
                            <div className="form-group ">
                                <div className='d-flex flex-column container w-75'>
                                    <button className="btn btn-purple mt-3 text-white" type="button" onClick={() => CallModal()}>Seleccionar operador</button>
                                </div>
                                <div className='d-flex flex-column container w-75'>
                                    <button className="btn btn-success mt-3" type="submit">Actualizar</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Modal className="container-fluid" backdrop="static" show={showModal} onHide={CallModal} size="lg" centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Buscar</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className="d-flex justify-content-center">
                        <label htmlFor="idNombre" className="col-sm-2 col-form-label">Cedula</label>
                        <div className="col-sm-5">
                            <input type="number" className="form-control bg-dark border-success text-white" id="dni" value={userSearch.dni} name='dni' onChange={OnChange} />
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-success" type="button" onClick={Search}><FaArrowAltCircleRight /></button>
                        </div>
                    </div>
                    <div className="table-responsive pt-4" hidden={showTable}>
                        <table className="table table-dark table-striped text-center">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Cedula</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{userSearch.name}</td>
                                    <td>{userSearch.surname}</td>
                                    <td>{userSearch.dni}</td>
                                    <td>{userSearch.email}</td>
                                    <td>{userSearch.rolename}</td>
                                    <td>
                                        <div className="form-group">
                                            <button className="btn btn-success" type="button" onClick={Assign}>Asignar</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

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