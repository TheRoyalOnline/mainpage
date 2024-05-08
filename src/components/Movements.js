import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MovementsList } from "./API";

export const Movements = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const props = location.state;
    const [movements, setMovements] = useState([]);

    useEffect(() => {
        if (props === null){
            navigate('/');
            return;
        }

        if (props.iduser === undefined)
            navigate('/Operations');

        async function Start() {
            const data = await MovementsList(props.iduser);
            setMovements(data);
        }

        Start();
    }, []);

    return (

        <div className='pt-2 text-white container' >
            <h1 className='text-center '>Lista de movimientos</h1>
            <div className='card border-success text-white bg-transparent mt-5'>

                <h5 className="card-header border-success text-white pt-4">Todos</h5>
                <div className='flex-column justify-content-center p-3'>
                    <div className="table-responsive">
                        <table className="table table-dark table-striped text-center">
                            <thead>
                                <tr >
                                    <th>Codigo</th>
                                    <th>Creditos</th>
                                    <th>Saldo</th>
                                    <th>Efectivo</th>
                                    <th hidden={props.role === 5}>Saldo</th>
                                    <th>Origen</th>
                                    <th>Destino</th>
                                    <th>Modulo</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    movements.map((item) => (
                                        <tr>
                                            <td>{item.code}</td>
                                            <td>{parseInt(item.credits).toLocaleString()}</td>
                                            <td>{parseInt(item.balancecre).toLocaleString()}</td>
                                            <td>₲ {parseInt(item.cash).toLocaleString()}</td>
                                            <td hidden={props.role === 5}>₲ {parseInt(item.balancecash).toLocaleString()}</td>
                                            <td>{item.origin}</td>
                                            <td>{item.destine}</td>
                                            <td>{item.module}</td>
                                            <td>{item.date}</td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>


        </div>

    );
}