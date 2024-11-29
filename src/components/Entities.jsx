import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {GetCities, GetCountries} from "./APIExtras";
import {GetEntities, GetUserDetails} from "./API";

const Entities = ({OnChangeEvent, user}) => {

    const alias_types = [{"id": 1, "type": "Nro CI"}, {"id": 2, "type": "Nro de RUC"}, {
        "id": 3,
        "type": "Email"
    }, {"id": 4, "type": "Nro. Telefono"},];


    const [entities, setEntities] = useState([]);

    useEffect(() => {
        LoadData();
    }, []);


    async function LoadData() {
        const ent = await GetEntities();
        setEntities(ent);
    }

    return (
        <>
            <div className='flex-column justify-content-center p-3'>
                <div className="justify-content-center pt-3">
                    <label htmlFor="idDir">Banco</label>
                    <select className="form-select bg-dark border-success text-white"
                            value={user.entity} name='entity' onChange={OnChangeEvent}>
                        {entities.map(item => (<option key={item.id} value={item.id}>{item.name}</option>))}
                    </select>
                </div>
                <div className="justify-content-center pt-3">
                    <label htmlFor="alias_type">Tipo de alias</label>
                    <select id="alias_type" className="form-select bg-dark border-success text-white"
                            value={user.alias_type} name='alias_type' onChange={OnChangeEvent}>
                        {alias_types.map(item => (<option key={item.id} value={item.id}>{item.type}</option>))}
                    </select>
                </div>
                <div className="justify-content-center pt-3">
                    <label htmlFor="alias">Alias</label>
                    <input id="alias" type="text" className="form-control bg-dark border-success text-white"
                           value={user.alias} name='alias' onChange={OnChangeEvent}/>
                </div>
                <h5 className="card-header border-success text-white pt-4"></h5>
                <div className="justify-content-center pt-3">
                    <label htmlFor="numbercode">Cuenta</label>
                    <input id="numbercode" type="text"
                           className="form-control bg-dark border-success text-white"
                           value={user.numbercode} name='numbercode' onChange={OnChangeEvent}
                    />
                </div>
                <div className="justify-content-center pt-3">
                    <label htmlFor="namecode">Nombre y apellido</label>
                    <input type="text" className="form-control bg-dark border-success text-white"
                           id="namecode" value={user.namecode} name='namecode' onChange={OnChangeEvent}
                    />
                </div>
                <div className="justify-content-center pt-3">
                    <label htmlFor="dnicode">Nro. CI</label>
                    <input type="text" className="form-control bg-dark border-success text-white"
                           id="dnicode" value={user.dnicode} name='dnicode' onChange={OnChangeEvent}/>
                </div>

            </div>
        </>

    )
};

export default Entities;