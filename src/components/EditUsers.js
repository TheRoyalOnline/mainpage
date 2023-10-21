import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Modal } from "react-bootstrap";
import { FaArrowAltCircleRight } from "react-icons/fa";

export const EditUser = () => {
    const [confirm, setConfirm] = useState(false);
    const [errMessage2, setErrMessage2] = useState('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showAsing, setShowAsing] = useState(false);
    const [assign, setAsign] = useState(false);
    const [convertion, setConvertion] = useState(0);
    const [transact, setTransact] = useState(false);
    const [others, setOthers] = useState(false);
    const [showTable, setShowTable] = useState(true);
    const [user, setUser] = useState([]);
    const [user1, setUser1] = useState([]);
    const [user2, setUser2] = useState([]);
    const [opType, setOpType] = useState('');
    const [dni, setDni] = useState(0);
    const [typeConfirm, setTypeConfirm] = useState('');
    const [ccash, setCcash] = useState(0);
    const [ccredit, setCcredit] = useState(0);
    const [deposit, setDeposit] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [userdata, setUserdata] = useState([]);
    const navigate = useNavigate();


    const refInputAssing = useRef(null);
    const refInputTransact = useRef(null);
    const refCheckAssing1 = useRef(null);
    const refCheckAssing2 = useRef(null);
    const refCheckTransact1 = useRef(null);
    const refCheckTransact2 = useRef(null);
    const refBtnConfirm = useRef(null);

    useEffect(() => {
        Starting();
    }, []);

    async function Starting() {
        const cookie = new Cookies();
        if (cookie.get("userdata") === undefined)
            navigate('/');

        setUserdata(cookie.get('userdata'));
    }


    function OnChange(e) {
        switch (e.target.name) {
            case 'dni':
                setDni(e.target.value)
                break;

            case 'amount1':
                setUser1({ ...user1, amount: e.target.value })
                break;

            case 'amount2':
                setUser2({ ...user2, amount: e.target.value })
                break;

            case 'assigntype':
                setUser1({ ...user1, type: e.target.value })
                break;

            case 'transacttype':
                setUser2({ ...user2, type: e.target.value })
                break;

            case 'ccash':
                setCcash(e.target.value)
                break;
            case 'ccredit':
                setCcredit(e.target.value)
                break;

            case 'cdeposit':
                setDeposit(e.target.value)
                break;
        }
    }


    async function Assign(e) {
    }

    function OnSubmit(form) {

    }

    function CallModal() {
        setShowModal(!showModal);
    }

    function Search() {

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
                                <label htmlFor="idNacionalidad">Nuevo rol</label>
                                <select className="form-select bg-dark border-success text-white" id="idNacionalidad" value={user.role} required name='role' onChange={OnChange}>
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
                                <label className="p-3" id="label1"><b>{user1.iduser != undefined ? '(' + user1.dni + ') ' + user1.surname + ', ' + user1.name : 'Ninguno'}</b></label>
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
                            <input type="number" className="form-control bg-dark border-success text-white" id="dni" value={dni} name='dni' onChange={OnChange} />
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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{user.name}</td>
                                    <td>{user.surname}</td>
                                    <td>{user.dni}</td>
                                    <td>{user.email}</td>
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
        </div>

    );
};

export default EditUser;