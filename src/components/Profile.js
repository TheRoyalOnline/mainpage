import React, { Component, useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GetCities, GetCountries } from "./APIExtras";
import { GetUserDetails } from "./API";

export const Profile = () => {
    const initialValues = {
        username: "",
        password: "",
        name: "",
        surname: "",
        dni: "",
        email: "",
        birthdate: new Date().toISOString().split('T')[0],
        nationality: "PRY",
        phonecode: "+595",
        phonenumber: "",
        district: 1,
        city: "",
        street: ""
    };

    const cookie = new Cookies();
    var invalidate = false;
    const navigate = useNavigate();
    const form = useRef(null);
    const [changePass, setChangePass] = useState(true);
    const txtPassword = useRef(null);
    const txtReplyPassword = useRef(null);
    let ref = useRef(null);
    const [user, setUser] = useState(initialValues);
    const [countries, setCountry] = useState([]);
    const [cities, setCity] = useState([]);

    useEffect(() => {
        // if(!false)
        //     navigate('/');
    }, []);

    useEffect(() => {
        async function LoadData() {
            
            const data = await GetCountries();
            setCountry(data);
            const data2 = await GetCities();
            setCity(data2);
            
            const cookie = new Cookies();
            const user = await GetUserDetails(cookie.get('username'));
            setUser(user);
        }
        LoadData();
    }, []);

    function OnSubmit(e) {

    }

    function ChangePassword(e) {
        setChangePass(!e.target.checked);
    }

    function OnChangeEvent(event) {
        setUser({ ...user, [event.target.name]: event.target.value });
    }


    async function OnValidate(event) {
        var usercase = false;

        switch (event.target.name) {
            case 'password':
                if (event.target.value.length > 0) {
                    ref = txtPassword;
                    invalidate = event.target.value.length < 8;
                }
                break;

            case 'replypassword':
                if (event.target.value.length > 0) {
                    ref = txtReplyPassword;
                    invalidate = user.password !== event.target.value;
                }
                break;

            default:
                break;
        }

        if (invalidate) {
            ref.current.classList.add("is-invalid");
            ref.current.classList.remove("border-success");
            if (usercase)
                ref.current.classList.remove("is-valid");
        }
        else {
            ref.current.classList.remove("is-invalid");
            ref.current.classList.add("border-success");
            if (usercase)
                ref.current.classList.add("is-valid");
        }
    }

    return (
        <form className='pt-2 text-white container register' ref={form} onSubmit={OnSubmit}>
            <h1 className='text-center '>Mi perfil</h1>
            <div className='card border-success text-white bg-transparent mt-5'>
                <h5 className="card-header border-success text-white">Datos generales</h5>

                <div className='flex-column justify-content-center p-3'>
                    <div className="justify-content-center pt-3">
                        <label htmlFor="idNombre">Nombre</label>
                        <input type="text" className="form-control bg-dark border-success text-white" id="idNombre" placeholder="Nombre" value={user.name} required name='name' onChange={OnChangeEvent} />
                    </div>

                    <div className="justify-content-center  pt-3">
                        <label htmlFor="idSurname">Apellido</label>
                        <input type="text" className="form-control bg-dark border-success text-white" id="idSurname" placeholder="Apellido" value={user.surname} required name='surname' onChange={OnChangeEvent} />
                    </div>

                    <div className="justify-content-center  pt-3">
                        <label htmlFor="idmail">Email</label>
                        <input type="email" className="form-control bg-dark border-success text-white" id="idmail" placeholder="Email" value={user.email} required name='email' onChange={OnChangeEvent} />
                    </div>

                    <div className="justify-content-center pt-3">
                        <label htmlFor="idcod">Movil</label>
                        <div className='d-flex'>
                            <select className="form-select w-50 bg-dark border-success text-white" id="idcod" value={user.phonecode} name='phonecode' onChange={OnChangeEvent} required>
                                {
                                    countries.map((item) =>
                                    (
                                        <option key={item.id} value={item.phone}>{item.id + ": " + item.phone}</option>
                                    ))
                                }
                            </select>
                            <input type="text" className="form-control flex-fill bg-dark border-success text-white" id="idmovil" value={user.phonenumber} name='phonenumber' onChange={OnChangeEvent} required maxLength={9} />

                        </div>

                    </div>

                </div>

                <h5 className="card-header border-success text-white pt-4">Cambiar contraseña<div className="form-check form-switch">
                    <input type="checkbox" className="form-check-input" onChange={ChangePassword}></input>
                </div> </h5>

                <div className='flex-column justify-content-center p-3' >

                    <div className="justify-content-center" hidden={changePass}>

                        <div className="justify-content-center  pt-3">
                            <label htmlFor="idPass">Contraseña actual</label>
                            <input type="password" className="form-control bg-dark border-success text-white" min="8" id="idPass" placeholder="Contraseña" aria-describedby="inputGroupPrepend3"
                                required name='password' ref={txtPassword} value={user.password} onChange={OnChangeEvent} onBlur={OnValidate} />
                            <div className="invalid-feedback">
                                Contraseñas debe contener al menos 8 caracteres.
                            </div>
                        </div>

                        <div className="justify-content-center  pt-3">
                            <label htmlFor="idPass2">Nueva contraseña</label>
                            <input type="password" className="form-control bg-dark border-success text-white" id="idPassrep" placeholder="Nueva contraseña" aria-describedby="inputGroupPrepend3"
                                required name='replypassword' ref={txtReplyPassword} onBlur={OnValidate} />
                            <div className="invalid-feedback">
                                Contraseñas no coinciden.
                            </div>
                        </div>

                        <div className="justify-content-center  pt-3">
                            <label htmlFor="idPass2">Repetir contraseña</label>
                            <input type="password" className="form-control bg-dark border-success text-white" id="idPassrep2" placeholder="Repite la contraseña" aria-describedby="inputGroupPrepend3"
                                required name='replypassword' ref={txtReplyPassword} onBlur={OnValidate} />
                            <div className="invalid-feedback">
                                Contraseñas no coinciden.
                            </div>
                        </div>
                    </div>

                </div>

                <h5 className="card-header border-success text-white pt-4">Dirección</h5>

                <div className='flex-column justify-content-center p-3'>
                    <div className="justify-content-center pt-3">
                        <label htmlFor="idDir">Distrito</label>
                        <select className="form-select bg-dark border-success text-white" id="idDistrito" value={user.district} name='district' onChange={OnChangeEvent} required>
                            {
                                cities.map(item => (
                                    <option key={item.id} value={item.id}>{item.city}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="justify-content-center pt-3">
                        <label htmlFor="idCiudad">Ciudad</label>
                        <input type="text" className="form-control bg-dark border-success text-white" id="idCiudad" placeholder="Ciudad" value={user.city} name='city' onChange={OnChangeEvent} required />
                    </div>
                    <div className="justify-content-center pt-3">
                        <label htmlFor="idCalle">Calle</label>
                        <input type="text" className="form-control bg-dark border-success text-white" id="idCalle" placeholder="Calle" value={user.street} name='street' onChange={OnChangeEvent} required />
                    </div>
                </div>

                <h5 className="card-header border-success text-white pt-4"></h5>
                <div className='text-center mt-3 mb-4'>
                    <div className="form-group ">

                        <div className='d-flex flex-column container w-75'>
                            <button className="btn btn-success mt-3" type="submit">Actualizar</button>
                        </div>

                    </div>
                </div>
            </div>

        </form>
    );
};


export default Profile;