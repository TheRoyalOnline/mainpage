import React, { useEffect, useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { GetUserDetails } from "./API";
import { Modal } from "react-bootstrap";
import { FindUser } from "./API";

export const Operations = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showAsing, setShowAsing] = useState(false);
    const [asign, setAsign] = useState(false);
    const [transact, setTransact] = useState(false);
    const [others, setOthers] = useState(false);
    const [showTable, setShowTable] = useState(true);
    const [user, setUser] = useState([]);
    const [user1, setUser1] = useState([]);
    const [user2, setUser2] = useState([]);
    const [opType, setOpType] = useState('');
    const [dni, setDni] = useState(0);

    const access = {
        '1': [1, 1, 1, 1],
        '2': [1, 1, 0, 0],
        '3': [1, 1, 0, 0],
        '4': [1, 1, 0, 0],
        '5': [0, 0, 0, 0]
    }

    useEffect(() => {
        async function Starting() {
            const cookie = new Cookies();
            if (cookie.get("isLogged") === undefined)
                navigate('/');

            const res = await GetUserDetails(cookie.get('username'));
            setShowAsing(access[res.role][0])
            setAsign(access[res.role][1])
            setTransact(access[res.role][2])
            setOthers(access[res.role][3])
        }

        Starting();
    }, []);

    function CallModal(e) {
        setOpType(e);
        setShowModal(!showModal);
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
        }
    }

    async function Search(e) {
        const u = await FindUser(dni);
        if (u.iduser !== undefined) {
            setUser(u);
            setShowTable(false);
        }
    }

    function Assign(e) {
        if (opType === 'op1')
            setUser1(u => ({ ...u, ...user }));
        else
            setUser2(u => ({ ...u, ...user }));

        setUser([]);
        setShowModal(false);
        setShowTable(true);
        setDni(0);
    }

    function OnSubmit(e) {
        switch (e.target.name) {
            case 'transact':
                break;
            case 'asign':
                break;
        }
    }

    return (
        <div>
            <div className='pt-2 text-white container register'>
                <h1 className='text-center'>Operaciones</h1>
                <div className='card border-success text-white bg-transparent mt-5' >
                    <h5 className="card-header border-success text-white">Datos operacionales</h5>

                    <div className='flex-column p-3' >
                        {
                            showAsing ? (
                                <div>
                                    <div className="form-group justify-content-center row pt-3">
                                        <label htmlFor="idNombre" className="col-sm-3 col-form-label">Asignacion</label>
                                        <div className="col-sm-5">
                                            <input type="number" className="form-control bg-dark border-success text-white" id="idCalle" value='9999' name='street' />
                                        </div>
                                    </div>
                                    <div className="form-group justify-content-center row pt-3">
                                        <label htmlFor="idNombre" className="col-sm-3 col-form-label">Guaranies</label>
                                        <div className="col-sm-5">
                                            <input type="number" className="form-control bg-dark border-success text-white" id="idCalle" value='999' name='street' readOnly />
                                        </div>
                                    </div>

                                </div>
                            ) : null
                        }

                        <div className="form-group justify-content-center row pt-3">
                            <label htmlFor="idNombre" className="col-sm-3 col-form-label">Creditos</label>
                            <div className="col-sm-5">
                                <input type="number" className="form-control bg-dark border-success text-white" id="idCalle" value='999' name='street' readOnly />
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {
                asign ? (

                    <form className='pt-2 text-white container register' name='asign' onSubmit={OnSubmit}>
                        <div className='card border-success text-white bg-transparent mt-5'>
                            <h5 className="card-header border-success text-white">Asignacion con Caja</h5>

                            <div className='d-flex justify-content-center p-3'>
                                <div className="form-check form-check-inline">
                                    <input className="btn-check" type="radio" name="assigntype" id="idcredits" value="credits" onChange={OnChange} />
                                    <label className="btn btn-outline-success text-white" for="idcredits">
                                        Creditos
                                    </label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input className="btn-check" type="radio" name="assigntype" id="idmoney" value="money" onChange={OnChange} />
                                    <label className="btn btn-outline-success text-white" for="idmoney">
                                        Guaranies
                                    </label>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className="form-group row pt-3">
                                    <label htmlFor="idNombre" className="col-sm-3 col-form-label">Monto</label>
                                    <div className="col-sm-8">
                                        <input type="number" className="form-control bg-dark border-success text-white" value={user1.amount} name='amount1' min={0} onChange={OnChange} />
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className="form-inline">
                                    <label htmlFor="label1 ">Asignado a:</label>
                                    <label className="p-3" id="label1"><b>{user1.iduser != undefined ? '(' + user1.dni + ') ' + user1.surname + ', ' + user1.name : 'Sin Asignacion'}</b></label>
                                </div>
                            </div>
                            <h5 className="card-header border-success text-white pt-4"></h5>
                            <div className='text-center mt-3 mb-4'>
                                <div className="form-group ">
                                    <div className='d-flex flex-column container w-75'>
                                        <button className="btn btn-purple mt-3 text-white" type="button" onClick={() => CallModal('op1')}>Seleccionar operador</button>
                                    </div>
                                    <div className='d-flex flex-column container w-75'>
                                        <button className="btn btn-success mt-3" type="submit">Mandar</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                ) : null
            }

            {
                transact ? (
                    <form className='pt-2 text-white container register' name="transact" onSubmit={OnSubmit}>
                        <div className='card border-success text-white bg-transparent mt-5'>
                            <h5 className="card-header border-success text-white">Transacciones con Caja</h5>

                            <div className='d-flex justify-content-center p-3'>
                                <div className="form-check form-check-inline">
                                    <input className="btn-check" type="radio" name="transacttype" id="idsell" value="sell" onChange={OnChange} />
                                    <label className="btn btn-outline-success text-white" for="idsell">
                                        Vender
                                    </label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input className="btn-check" type="radio" name="transacttype" id="idpay" value="pay" onChange={OnChange} />
                                    <label className="btn btn-outline-success text-white" for="idpay">
                                        Pagar
                                    </label>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className="form-group row pt-3">
                                    <label htmlFor="idNombre" className="col-sm-3 col-form-label">Monto</label>
                                    <div className="col-sm-8">
                                        <input type="number" className="form-control bg-dark border-success text-white" value={user2.amount} min={0} name='amount2' onChange={OnChange} />
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className="form-inline">
                                    <label htmlFor="label1 ">Asignado a:</label>
                                    <label className="p-3" id="label1"><b>{user2.iduser != undefined ? '(' + user2.dni + ') ' + user2.surname + ', ' + user2.name : 'Sin Asignacion'}</b></label>
                                </div>
                            </div>
                            <h5 className="card-header border-success text-white pt-4"></h5>
                            <div className='text-center mt-3 mb-4'>
                                <div className="form-group ">
                                    <div className='d-flex flex-column container w-75'>
                                        <button className="btn btn-purple mt-3 text-white" type="button" name="findb" onClick={() => CallModal('op2')}>Seleccionar operador</button>
                                    </div>
                                    <div className='d-flex flex-column container w-75'>
                                        <button className="btn btn-success mt-3" type="submit">Mandar</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>

                ) : null
            }
            {
                others ? (
                    <form className='pt-2 pb-5 text-white container register' name='others' onSubmit={OnSubmit}>
                        <div className='card border-success text-white bg-transparent mt-5'>
                            <h5 className="card-header border-success text-white">Otros movimientos</h5>

                            <div className='flex-column p-3'>
                                <div className="form-group row justify-content-center pt-3">
                                    <label htmlFor="idNombre" className="col-sm-4 col-form-label">Crear creditos</label>
                                    <div className="col-sm-5">
                                        <input type="number" className="form-control bg-dark border-success text-white" id="idCalle" placeholder="Calle" value='999' name='street' readonly />
                                    </div>
                                    <div className="col-sm-2">
                                        <button className="btn btn-success" type="submit"><FaArrowAltCircleRight /></button>
                                    </div>
                                </div>

                                <div className="form-group row justify-content-center pt-3">
                                    <label htmlFor="idNombre" className="col-sm-4 col-form-label">Ingresar efectivo</label>
                                    <div className="col-sm-5">
                                        <input type="number" className="form-control bg-dark border-success text-white" id="idCalle" placeholder="Calle" value='999' name='street' readonly />
                                    </div>
                                    <div className="col-sm-2">
                                        <button className="btn btn-success" type="submit"><FaArrowAltCircleRight /></button>
                                    </div>
                                </div>

                                <div className="form-group row justify-content-center pt-3">
                                    <label htmlFor="idNombre" className="col-sm-4 col-form-label">Depositar efectivo</label>
                                    <div className="col-sm-5">
                                        <input type="number" className="form-control bg-dark border-success text-white" id="idCalle" placeholder="Calle" value='999' name='street' readonly />
                                    </div>
                                    <div className="col-sm-2">
                                        <button className="btn btn-success" type="submit"><FaArrowAltCircleRight /></button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </form>

                ) : null
            }
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
                        <table className="table">
                            <tr>
                                <th className="bg-dark text-white text-center">Nombre</th>
                                <th className="bg-dark text-white text-center">Apellido</th>
                                <th className="bg-dark text-white text-center">Cedula</th>
                                <th className="bg-dark text-white text-center">Email</th>
                                <th className="bg-dark "></th>
                            </tr>
                            <tr>
                                <td className="text-center ">{user.name}</td>
                                <td className="text-center">{user.surname}</td>
                                <td className="text-center">{user.dni}</td>
                                <td className="text-center">{user.email}</td>
                                <td className="text-center">
                                    <div className="form-group">
                                        <button className="btn btn-success" type="button" onClick={Assign}>Asignar</button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>


    );
};
