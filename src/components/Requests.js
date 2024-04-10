import React, {useEffect, useRef, useState} from "react";
import {GetRequests, Response} from "./API";

const Requests = (props) => {
    const [list, setList] = useState([]);
    const [requests, setRequests] = useState([]);
    const refRequests = useRef(null);

    useEffect(() => {
        getRequests();
    }, []);

    async function getRequests() {
        const list = await GetRequests();
        setRequests(list);
    }

    async function ResponseRequests(value, id, iduser) {
        // refRequests.current.disabled = true;
        const res = await Response(id, value, iduser);
        if (res === 200) {
            getRequests();
        }
    }

    return (

        requests.length > 0 ? (
            <div className='pt-2 text-white container register' name='assign' id="assign">
                <div className='card border-success text-white bg-transparent mb-5'>
                    <h5 className="card-header border-success text-white">Solicitudes</h5>

                    <div className="table-responsive">
                        <table className="table table-dark table-striped text-center">
                            <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Tipo</th>
                                <th>Creditos</th>
                                <th>Efectivo</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                requests.map(item => (
                                    <tr key={item.idrequests}>
                                        <td>{item.userfrom}</td>
                                        <td>{item.type === "sell" ? "Compra" : "Venta"}</td>
                                        <td>{item.credits}</td>
                                        <td>{item.cash}</td>
                                        <td>
                                            <div className="form-group">
                                                {
                                                    props.iduser === item.iduserOrigin ? (
                                                        <button ref={refRequests} className="btn btn-danger"
                                                                type="button"
                                                                onClick={(e) => ResponseRequests("RE", item.idrequest, props.iduser)}>Cancelar
                                                        </button>

                                                    ) : (
                                                        <>
                                                            <button ref={refRequests} className="btn btn-success"
                                                                    type="button"
                                                                    onClick={(e) => ResponseRequests("AP", item.idrequest, props.iduser)}>Aceptar
                                                            </button>
                                                            <button ref={refRequests} className="btn btn-danger"
                                                                    type="button"
                                                                    onClick={(e) => ResponseRequests("RE", item.idrequest, props.iduser)}>Rechazar
                                                            </button>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        ) : null

    );
}

export default Requests;
