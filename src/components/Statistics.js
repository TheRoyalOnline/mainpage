import React, {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom'
import {RiCoinFill, RiCoinLine, RiPercentFill} from "react-icons/ri";
import {CiCalendarDate} from "react-icons/ci"
import {DeleteResume, GetDetails, GetStatistics, RoomById} from "./Game";
import {Modal, ProgressBar} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'

export const Statistics = () => {
    const navigate = useNavigate();
    const [until, setUntil] = useState();
    const [since, setSince] = useState();
    const [alldata, setAlldata] = useState([]);
    const [cres, setCres] = useState(0);
    const [allwin, setAllwin] = useState(0);
    const [totalbet, setTotalbet] = useState(0);
    const [totalMain, setTotalMain] = useState(0);
    const [totalBonus, setTotalBonus] = useState(0);
    const [totalSBonus, setTotalSBonus] = useState(0);
    const [allspins, setAllspins] = useState(0);
    const [numberMain, setNumberMain] = useState(0);
    const [numberBonus, setNumberBonus] = useState(0);
    const [numberSBonus, setNumberSBonus] = useState(0);
    const [details, setDetails] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [idroom, setIdroom] = useState(0);

    useEffect(() => {
        Starting();
        const intervalId = setInterval(Starting, 3000);

        return () => clearInterval(intervalId);
    }, []);


    async function Starting() {
        const idr = location.state.idroom;
        setIdroom(idr);
        const data = await GetStatistics(idr);
        setAlldata(data);

        if (data === undefined)
            return;

        var cardin = 0, cardout = 0, historyBet = 0, historyPrize = 0, numberBonus = 0;
        var numberPrizesMain = 0, numberSuperBonus = 0, spins = 0, totalMain = 0, totalBonus = 0, totalSBonus = 0;

        data.map(item => {
            cardin += item.cardIn;
            cardout += item.cardOut;
            historyBet += item.historyBet;
            historyPrize += item.historyPrize;
            numberBonus += item.numberBonus;
            numberPrizesMain += item.numberPrizesMain;
            numberSuperBonus += item.numberSuperBonus;
            spins += item.spins;
            totalMain += item.totalMain;
            totalBonus += item.totalBonus;
            totalSBonus += item.totalSBonus;
        });

        const c = cardout - cardin;
        const all = historyPrize + c;
        setCres(c);
        setAllwin(all);
        setTotalbet(historyBet);
        setTotalMain(totalMain);
        setTotalBonus(totalBonus);
        setTotalSBonus(totalSBonus);
        setAllspins(spins);
        setNumberMain(numberPrizesMain);
        setNumberBonus(numberBonus);
        setNumberSBonus(numberSuperBonus);

        if (loading) {
            setLoading(false);
            const today = new Date();
            setSince(today.toISOString().split('T')[0]);
            setUntil(today.toISOString().split('T')[0]);
        }

    }

    function OnChangeDate(e) {
        if (e.target.name === "since")
            setSince(e.target.value);
        else
            setUntil(e.target.value);
    }

    async function FindLog(e) {
        navigate("/Operations/Details", {state: {idroom: idroom}});
    }

    async function ClearResume(e) {
        setShow(false);
        setLoading(true);
        const res = await DeleteResume(idroom);
        setLoading(false);
    }

    return (
        <div>
            <div className='pt-2 text-white container register pb-5'>
                <h1 className='text-center'>Estadisticas</h1>
                <h2 className='text-center'>Sala {location.state.idroom}</h2>
                <div className="d-flex justify-content-between pt-4">
                    <button className="btn btn-success p-2" onClick={FindLog}>Log de la sala</button>
                    <button className="btn btn-danger p-2" onClick={() => setShow(true)}>Eliminar datos</button>
                </div>
                <div className='card border-success text-white bg-transparent mt-5'>
                    <h5 className="card-header border-success text-white">Generales</h5>

                    <div className='flex-column p-3'>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">All total win:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span
                                            className="input-group-text bg-success border-success text-white text-white h-100"
                                            id="idUser"><RiCoinFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white"
                                           value={allwin.toFixed(2)} readOnly/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">Total bet:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span
                                            className="input-group-text bg-success border-success text-white text-white h-100"
                                            id="idUser"><RiCoinFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white"
                                           value={totalbet.toFixed(2)} readOnly/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">RPT:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span
                                            className="input-group-text bg-success border-success text-white text-white h-100"
                                            id="idUser"><RiPercentFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white"
                                           value={(allwin / totalbet * 100).toFixed(2)} readOnly/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">W-B:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span
                                            className="input-group-text bg-success border-success text-white text-white h-100"
                                            id="idUser"><RiCoinFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white"
                                           value={(allwin - totalbet).toFixed(2)} readOnly/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='card border-success text-white bg-transparent mt-5'>
                    <h5 className="card-header border-success text-white">De juego</h5>

                    <div className='flex-column p-3'>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">Main:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span
                                            className="input-group-text bg-success border-success text-white text-white h-100"
                                            id="idUser"><RiCoinFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white"
                                           value={totalMain} readOnly/>
                                    <input type="text" className="form-control bg-dark border-success text-white"
                                           value={(totalMain / allwin * 100).toFixed(2) + "%"} readOnly/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">Bonus:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span
                                            className="input-group-text bg-success border-success text-white text-white h-100"
                                            id="idUser"><RiCoinFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white"
                                           value={totalBonus} readOnly/>
                                    <input type="text" className="form-control bg-dark border-success text-white"
                                           value={(totalBonus / allwin * 100).toFixed(2) + "%"} readOnly/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">S. Bonus</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span
                                            className="input-group-text bg-success border-success text-white text-white h-100"
                                            id="idUser"><RiCoinFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white"
                                           value={totalSBonus} readOnly/>
                                    <input type="text" className="form-control bg-dark border-success text-white"
                                           value={(totalSBonus / allwin * 100).toFixed(2) + "%"} readOnly/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">R. card:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span
                                            className="input-group-text bg-success border-success text-white text-white h-100"
                                            id="idUser"><RiCoinFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white"
                                           value={cres} readOnly/>
                                    <input type="text" className="form-control bg-dark border-success text-white"
                                           value={(cres / allwin * 100).toFixed(2) + "%"} readOnly/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='card border-success text-white bg-transparent mt-5'>
                    <h5 className="card-header border-success text-white">De frecuencia</h5>

                    <div className='flex-column p-3'>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">All spins:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span
                                            className="input-group-text bg-success border-success text-white text-white h-100"
                                            id="idUser"><RiCoinFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white"
                                           value={allspins} readOnly/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">Main prize:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span
                                            className="input-group-text bg-success border-success text-white text-white h-100"
                                            id="idUser"><RiCoinFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white"
                                           value={numberMain} readOnly/>
                                    <input type="text" className="form-control bg-dark border-success text-white"
                                           value={(numberMain / allspins * 100).toFixed(2) + "%"} readOnly/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">Bonus:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span
                                            className="input-group-text bg-success border-success text-white text-white h-100"
                                            id="idUser"><RiCoinFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white"
                                           value={numberBonus} readOnly/>
                                    <input type="text" className="form-control bg-dark border-success text-white"
                                           value={(numberBonus / allspins * 100).toFixed(2) + "%"} readOnly/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">S. Bonus:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span
                                            className="input-group-text bg-success border-success text-white text-white h-100"
                                            id="idUser"><RiCoinFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white"
                                           value={numberSBonus} readOnly/>
                                    <input type="text" className="form-control bg-dark border-success text-white"
                                           value={(numberSBonus / allspins * 100).toFixed(2) + "%"} readOnly/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
            <Modal show={show} backdrop="static" keyboard={false} centered={true}>
                <Modal.Header>
                    <Modal.Title>Borrar datos 🗑️</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Estas seguro del reinicio de las estadisticas de esta sala?
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-success" onClick={() => setShow(false)}>Cancelar</button>
                    <button type="button" className="btn btn-danger" onClick={ClearResume}>Continuar</button>
                </Modal.Footer>
            </Modal>
            <Modal show={loading} backdrop="static" keyboard={false} centered={true}>
                <Modal.Header>
                    <Modal.Title>CARGANDO.. ⌛</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProgressBar className="progress-bar progress-bar-striped bg-success progress-bar-animated"/>
                </Modal.Body>
            </Modal>
        </div>

    );

};

export default Statistics;