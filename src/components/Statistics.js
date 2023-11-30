import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import { RiCoinFill, RiCoinLine, RiPercentFill } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci"
import { GetDetails, GetStatistics, RoomById } from "./Game";
import { Modal, ProgressBar } from "react-bootstrap";

export const Statistics = () => {
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

    async function FindLog(e){
        setLoading(true);
        const s = new Date(since);
        const u = new Date(until);
        u.setDate(u.getDate() + 1);
        const det = await GetDetails(idroom,s.toISOString(),u.toISOString());
        // const results = det.details.flatMap(item =>
        //     item.details.flatMap(detail => ({ date: detail.date, results: detail.result }))
        // );

        // const results = det.flatMap(user => {
        //     return user.details.flatMap(detail => {
        //         return detail.result.map(result => ({
        //             username: user.username,
        //             date: detail.date,
        //             results: [
        //                 {
        //                     bet: result.bet,
        //                     earn: result.earn,
        //                     hour: result.hour,
        //                     lines: result.lines,
        //                     resultType: result.resultType,
        //                     spinNumber: result.spinNumber,
        //                     winCombination: result.winCombination
        //                 }
        //             ]
        //         }));
        //     });
        // });
        console.log(det)
        setDetails(det);
        setLoading(false);
    }

    return (
        <div>
            <div className='pt-2 text-white container register pb-5'>
                <h1 className='text-center'>Estadisticas</h1>
                <h2 className='text-center'>Sala {location.state.idroom}</h2>
                <div className='card border-success text-white bg-transparent mt-5' >
                    <h5 className="card-header border-success text-white">Generales</h5>

                    <div className='flex-column p-3' >
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">All total win:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill /></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={allwin} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">Total bet:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill /></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={totalbet} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">RPT:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiPercentFill /></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={(allwin / totalbet * 100).toFixed(2)} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">W-B:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill /></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={allwin - totalbet} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='card border-success text-white bg-transparent mt-5' >
                    <h5 className="card-header border-success text-white">De juego</h5>

                    <div className='flex-column p-3' >
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">Main:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill /></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={totalMain} readOnly />
                                    <input type="text" className="form-control bg-dark border-success text-white" value={(totalMain / allwin * 100).toFixed(2) + "%"} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">Bonus:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill /></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={totalBonus} readOnly />
                                    <input type="text" className="form-control bg-dark border-success text-white" value={(totalBonus / allwin * 100).toFixed(2) + "%"} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">S. Bonus</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill /></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={totalSBonus} readOnly />
                                    <input type="text" className="form-control bg-dark border-success text-white" value={(totalSBonus / allwin * 100).toFixed(2) + "%"} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">R. card:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill /></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={cres} readOnly />
                                    <input type="text" className="form-control bg-dark border-success text-white" value={(cres / allwin * 100).toFixed(2) + "%"} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='card border-success text-white bg-transparent mt-5' >
                    <h5 className="card-header border-success text-white">De frecuencia</h5>

                    <div className='flex-column p-3' >
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">All spins:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill /></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={allspins} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">Main prize:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill /></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={numberMain} readOnly />
                                    <input type="text" className="form-control bg-dark border-success text-white" value={(numberMain / allspins * 100).toFixed(2) + "%"} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">Bonus:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill /></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={numberBonus} readOnly />
                                    <input type="text" className="form-control bg-dark border-success text-white" value={(numberBonus / allspins * 100).toFixed(2) + "%"} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">S. Bonus:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill /></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={numberSBonus} readOnly />
                                    <input type="text" className="form-control bg-dark border-success text-white" value={(numberSBonus / allspins * 100).toFixed(2) + "%"} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>




                <div className='card border-success text-white bg-transparent mt-5' >
                    <h5 className="card-header border-success text-white">Log de la sala</h5>
                    <div className='flex-column p-3' >
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">Desde:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <input type="date" className=" input-group-text bg-dark border-success text-white  h-100 calendar" value={since} name="since" onChange={OnChangeDate}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">Hasta:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <input type="date" className="input-group-text bg-dark border-success text-white h-100" value={until} name="until" onChange={OnChangeDate}/>
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
                                    <th>Tipo</th>
                                    <th>Lineas</th>
                                    <th>Apuesta</th>
                                    <th>Premio</th>
                                    <th>Combinacion</th>
                                    <th>Hora</th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    details.map(item => (
                                        <React.Fragment key={item.username}>
                                            <tr>
                                                <td colSpan={7} className="text-warning "><b>{item.username}</b></td>
                                            </tr>
                                            {item.details.map(i => (
                                                <React.Fragment key={i.date}>
                                                    <tr>
                                                        <td colSpan={7} className="text-success "><b>{i.date.split('T')[0]}</b></td>
                                                    </tr>
                                                    {i.result.map(r => (
                                                        <tr key={r.spinNumber}>
                                                            <td>{r.spinNumber}</td>
                                                            <td>{r.resultType}</td>
                                                            <td>{r.lines}</td>
                                                            <td>{r.bet}</td>
                                                            <td>{r.earn}</td>
                                                            <td>{r.winCombination}</td>
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

export default Statistics;