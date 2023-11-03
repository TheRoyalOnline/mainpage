import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import { RiCoinFill, RiCoinLine, RiPercentFill } from "react-icons/ri";
import { GetStatistics , RoomById } from "./Game";

export const Statistics = () => {
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
    const location = useLocation();

    useEffect(() => {
        Starting();
    }, []);


    async function Starting(){
        const idroom = location.state.idroom;
        const data = await GetStatistics(idroom);
        setAlldata(data);

        if (data === undefined)
            return;
    
        var cardin = 0, cardout = 0, historyBet = 0, historyPrize = 0, numberBonus = 0;
        var numberPrizesMain = 0, numberSuperBonus = 0, spins = 0, totalMain = 0, totalBonus = 0, totalSBonus = 0;
    
        data.map( item => {
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

        setCres(cardout-cardin);
        setAllwin(historyPrize + cres);
        setTotalbet(historyBet);
        setTotalMain(totalMain);
        setTotalBonus(totalBonus);
        setTotalSBonus(totalSBonus);
        setAllspins(spins);
        setNumberMain(numberPrizesMain);
        setNumberBonus(numberBonus);
        setNumberSBonus(numberSuperBonus);
    }

    return(
        <div>
            <div className='pt-2 text-white container register'>
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
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill/></span>
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
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill/></span>
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
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiPercentFill/></span>
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
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill/></span>
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
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={totalMain} readOnly />
                                    <input type="text" className="form-control bg-dark border-success text-white" value={(totalMain / allwin * 100).toFixed(2) + "%" } readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">Bonus:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={totalBonus} readOnly />
                                    <input type="text" className="form-control bg-dark border-success text-white" value={(totalBonus / allwin * 100).toFixed(2) + "%" } readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">S. Bonus</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={totalSBonus} readOnly />
                                    <input type="text" className="form-control bg-dark border-success text-white" value={(totalSBonus / allwin * 100).toFixed(2) + "%" } readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">R. card:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={cres} readOnly />
                                    <input type="text" className="form-control bg-dark border-success text-white" value={(cres / allwin * 100).toFixed(2) + "%" } readOnly />
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
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill/></span>
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
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={numberMain} readOnly />
                                    <input type="text" className="form-control bg-dark border-success text-white" value={(numberMain / allspins * 100).toFixed(2) + "%" } readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">Bonus:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={numberBonus} readOnly />
                                    <input type="text" className="form-control bg-dark border-success text-white" value={(numberBonus / allspins * 100).toFixed(2) + "%" } readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="form-group justify-content-center row pt-3">
                            <label className="col-sm-3 col-form-label">S. Bonus:</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><RiCoinFill/></span>
                                    </div>
                                    <input type="number" className="form-control bg-dark border-success text-white" value={numberSBonus} readOnly />
                                    <input type="text" className="form-control bg-dark border-success text-white" value={(numberSBonus / allspins * 100).toFixed(2) + "%" } readOnly />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>



            </div>
        </div>

    );

};

export default Statistics;