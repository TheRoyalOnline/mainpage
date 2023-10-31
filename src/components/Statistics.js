import React from "react";
import { useLocation } from 'react-router-dom'
import { RiCoinFill, RiCoinLine, RiPercentFill } from "react-icons/ri";

export const Statistics = () => {
    const location = useLocation();
    return (
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
                                    <input type="number" className="form-control bg-dark border-success text-white" value={0} readOnly />
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
                                    <input type="number" className="form-control bg-dark border-success text-white" value={0} readOnly />
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
                                    <input type="number" className="form-control bg-dark border-success text-white" value={0} readOnly />
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
                                    <input type="number" className="form-control bg-dark border-success text-white" value={0} readOnly />
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
                                    <input type="number" className="form-control bg-dark border-success text-white" value={0} readOnly />
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
                                    <input type="number" className="form-control bg-dark border-success text-white" value={0} readOnly />
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
                                    <input type="number" className="form-control bg-dark border-success text-white" value={0} readOnly />
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
                                    <input type="number" className="form-control bg-dark border-success text-white" value={0} readOnly />
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
                                    <input type="number" className="form-control bg-dark border-success text-white" value={0} readOnly />
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
                                    <input type="number" className="form-control bg-dark border-success text-white" value={0} readOnly />
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
                                    <input type="number" className="form-control bg-dark border-success text-white" value={0} readOnly />
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
                                    <input type="number" className="form-control bg-dark border-success text-white" value={0} readOnly />
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