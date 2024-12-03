import React, {useEffect, useRef, useState} from "react";
import {GetRequests, Response} from "./API";
import {FaArrowAltCircleRight} from "react-icons/fa";
import Cookies from "universal-cookie";

const Requests = (props) => {
    const [requests, setRequests] = useState([]);
    const refRequests = useRef(null);
    const [dni, setDni] = useState(0);
    const [canFind, setCanFind] = useState(false);

    useEffect(() => {
        const cookies = new Cookies();
        setCanFind(cookies.get('userdata').role !== 5);
        getRequests();
    }, []);

    async function getRequests() {
        const list = await GetRequests(dni);
        setRequests(list);
    }

    async function ResponseRequests(value, id, iduser) {
        // refRequests.current.disabled = true;
        const res = await Response(id, value, iduser);
        if (res === 200) {
            getRequests();
        }
    }

    const alias_types = [{"id": 1, "type": "Nro CI"}, {"id": 2, "type": "Nro de RUC"}, {
        "id": 3, "type": "Email"
    }, {"id": 4, "type": "Nro. Telefono"},];

    return (

        <div className='pt-2 text-white register' name='assign' id="assign">
            <div className='border-success text-white bg-transparent mb-5'>
                <h5 className="card-header border-success text-white">Cobro de premio</h5>
                {canFind ? (<div className="form-group row justify-content-center pt-3 pb-3">
                        <label htmlFor="idNombre" className="col-sm-4 col-form-label">Buscar por CI</label>
                        <div className="col-sm-5">
                            <input type="number" className="form-control bg-dark border-success text-white"
                                   value={dni} required onChange={(e) => setDni(e.target.value)}/>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-success" onClick={(e) => getRequests()}>
                                <FaArrowAltCircleRight/></button>
                        </div>
                    </div>

                ) : null}
                {requests.length > 0 ? (<div className="table-responsive">
                        {requests[0].alias ? (<div className="m-2">

                                <div className="form-floating pb-2">
                                    <input type="text"
                                           className="form-control bg-dark border-success text-white px-3"
                                           value={requests[0]?.entityname || ""}/>
                                    <label htmlFor="floatingEmail" className="ms-1">Banco</label>
                                </div>
                                <div className="row gap-3">
                                    <div className="form-floating col">
                                        <input type="text"
                                               className="form-control bg-dark border-success text-white  px-2"
                                               value={alias_types[requests[0].alias_type]?.type || ""}/>
                                        <label htmlFor="floatingEmail" className="ms-2">Tipo</label>
                                    </div>
                                    <div className="form-floating col">
                                        <input type="text"
                                               className="form-control bg-dark border-success text-white  px-2"
                                               value={requests[0]?.alias || ""}/>
                                        <label htmlFor="floatingEmail" className="ms-2">Alias</label>
                                    </div>
                                </div>

                            </div>

                        ) : <label className="text-center">Sin datos bancarios</label>}

                        <table className="table table-dark table-striped text-center">
                            <thead>
                            <tr key='head'>
                                <th>De</th>
                                <th>Para</th>
                                <th>Tipo</th>
                                <th>Creditos</th>
                                <th>Efectivo</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {requests.map(item => (<tr key={item.idrequests}>
                                    <td>{item.userfrom}</td>
                                    <td>{item.userfor}</td>
                                    <td>{item.type === "sell" ? "Compra" : "Venta"}</td>
                                    <td>{item.credits}</td>
                                    <td>{item.cash}</td>
                                    <td>
                                        <div className="form-group">
                                            {props.iduser === item.iduserTarget && item.iduserOrigin === 0 ? (
                                                <button ref={refRequests} className="btn btn-danger"
                                                        type="button"
                                                        onClick={(e) => ResponseRequests("RE", item.idrequest, props.iduser)}>Cancelar
                                                </button>

                                            ) : (<>
                                                    <button ref={refRequests}
                                                            className="btn btn-success mx-2"
                                                            type="button"
                                                            onClick={(e) => ResponseRequests("AP", item.idrequest, props.iduser)}>Aceptar
                                                    </button>
                                                    <button ref={refRequests} className="btn btn-danger"
                                                            type="button"
                                                            onClick={(e) => ResponseRequests("RE", item.idrequest, props.iduser)}>Rechazar
                                                    </button>
                                                </>)}
                                        </div>
                                    </td>
                                </tr>))}

                            </tbody>
                        </table>
                    </div>) : (
                    <p className="card-header border-success text-white text-center">Sin solicitudes pendientes</p>)}
            </div>
        </div>


    );
}

export default Requests;
