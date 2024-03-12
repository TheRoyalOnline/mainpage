import React, { useEffect, useState } from "react";
import { UserCommission } from "./API";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const Commission = () => {
    const navigate = useNavigate();    
    const today = new Date();
    const [commission, setCommission] = useState([]);
    const [until, setUntil] = useState(today.toISOString().split('T')[0]);
    const [since, setSince] = useState(today.toISOString().split('T')[0]);
    const [total, setTotal] =useState(0.0);
    const location = useLocation();
    useState(()=>{
        Start();
    }, []);


    function Start() {
        const cookie = new Cookies();
        if (cookie.get("userdata") === undefined && cookie.get("userdata").role !== 1)
            navigate('/');

        GetCommissions();
    }

    async function GetCommissions() {
        setTotal(0.0);
        const com = await UserCommission(location.state.iduser, since, until);
        setCommission(com);
        var sum = 0;
        com.forEach(item=>{
            sum += parseFloat(item.commission);
        });

        setTotal(sum);
    }

    function OnChangeDate(event){
        if(event.target.name === "since")
            setSince(event.target.value);
        else
            setUntil(event.target.value);
    }

    return (
        <>
            <div className='pt-2 text-white container' >
                <h1 className='text-center '>Lista de comisiones</h1>
                <div className='card border-success text-white bg-transparent mt-5'>

                    <h5 className="card-header border-success text-white pt-4">Vendedor: {location.state.username}</h5>

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
                                    <button className="btn btn-success" onClick={(e) => GetCommissions()}>Buscar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex-column justify-content-center p-3'>
                        <div className="table-responsive">
                            <table className="table table-dark table-striped text-center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Usuario</th>
                                        <th>Comision</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={0}>
                                        <td></td>
                                        <td><b>TOTAL:</b></td>
                                        <td><b>{total.toFixed(2)}</b></td>
                                        <td></td>
                                    </tr>
                                    {
                                        commission.map((item, index) => (
                                            <tr key={item.iduser}>
                                                <td><b>{index + 1}</b></td>
                                                <td>{item.username}</td>
                                                <td>{item.commission}</td>
                                                <td>{item.createdat}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>


            </div>
        </>
    );
};

export default Commission;