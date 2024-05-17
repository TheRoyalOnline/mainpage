import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import { RiCoinFill, RiCoinLine, RiPercentFill } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci"
import { GetDetails } from "./Game";
import { Modal, ProgressBar } from "react-bootstrap";

export const StatisticsDetails = () => {
    const [until, setUntil] = useState();
    const [since, setSince] = useState();
    const [details, setDetails] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [idroom, setIdroom] = useState(0);

    useEffect(() => {
        Starting();
    }, []);


    function Starting() {
        const idr = location.state.idroom;
        setIdroom(idr);
        const today = new Date();
        setSince(today.toISOString().split('T')[0]);
        setUntil(today.toISOString().split('T')[0]);
    }

    function OnChangeDate(e) {
        if (e.target.name === "since")
            setSince(e.target.value);
        else
            setUntil(e.target.value);
    }

    async function FindLog(e) {
        setLoading(true);
        const s = new Date(since);
        const u = new Date(until);
        u.setDate(u.getDate() + 1);
        const det = await GetDetails(idroom, s.toISOString(), u.toISOString());
        setDetails(det);
        setLoading(false);
    }

    return (
        <div>
            <div className='text-white container pt-3'>
                <h1 className='text-center'>Resumen de jugadas</h1>
                <h2 className='text-center'>Sala {location.state.idroom}</h2>

                <div className='card border-success text-white bg-transparent mt-5' >
                    <h5 className="card-header border-success text-white">Log de la sala</h5>
                    <div className='flex-column p-3' >
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">Desde:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <input type="date" className=" input-group-text bg-dark border-success text-white  h-100 calendar" value={since} name="since" onChange={OnChangeDate} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">Hasta:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <input type="date" className="input-group-text bg-dark border-success text-white h-100" value={until} name="until" onChange={OnChangeDate} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label"></label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <button className="btn btn-success" onClick={FindLog}>Buscar</button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="table-responsive">
                        <table className="table table-dark table-striped text-center">
                            <thead>
                                <tr>
                                    <th>Giro</th>
                                    <th>Lineas</th>
                                    <th>Apuesta</th>
                                    <th>Premio main</th>
                                    <th>Carta In</th>
                                    <th>Carta Out</th>
                                    <th>Bonus</th>
                                    <th>S. Bonus</th>
                                    <th>Usuario</th>
                                    <th>Combinacion</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    details.map(item => (
                                        <React.Fragment key={item.username}>
                                            {item.details.map(i => (
                                                <React.Fragment key={i.date}>
                                                    {i.result.map(r => (
                                                        <tr key={r.spinNumber}>
                                                            <td>{r.spinNumber}</td>
                                                            <td>{r.lines}</td>
                                                            <td>{parseFloat(r.bet).toFixed(2)}</td>
                                                            <td>{parseFloat(r.earn).toFixed(2)}</td>
                                                            <td>-{parseFloat(r.cardIn).toFixed(2)}</td>
                                                            <td>{parseFloat(r.cardOut).toFixed(2)}</td>
                                                            <td>{parseFloat(r.bonusEarn).toFixed(2)}</td>
                                                            <td>{parseFloat(r.sbonusEarn).toFixed(2)}</td>
                                                            <td>{item.username}</td>
                                                            <td>{r.winCombination}</td>
                                                            <td>{i.date.split('T')[0]}</td>
                                                            <td>{r.hour}</td>
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </React.Fragment>
                                    ))

                                }
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>

            <Modal show={loading} backdrop="static" keyboard={false} centered={true}>
                <Modal.Header>
                    <Modal.Title>CARGANDO.. ⌛</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProgressBar className="progress-bar progress-bar-striped bg-success progress-bar-animated" />
                </Modal.Body>
            </Modal>
        </div>

    );

};

export default StatisticsDetails;