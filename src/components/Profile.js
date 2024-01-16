import React, { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GetCities, GetCountries } from "./APIExtras";
import { GetUserDetails, TestPassword, UpdateUserDetails } from "./API";

export const Profile = () => {
    const initialValues = {
        iduser: 0,
        username: "",
        password: "",
        newpassword:"",
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
        street: "",
        active: 0
    };

    var invalidate = false;
    const navigate = useNavigate();
    const form = useRef(null);
    const [changePass, setChangePass] = useState(true);
    const txtPassword = useRef(null);
    const txtNewPassword = useRef(null);
    const txtReplyPassword = useRef(null);
    let ref = useRef(null);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(initialValues);
    const [countries, setCountry] = useState([]);
    const [cities, setCity] = useState([]);

    useEffect(() => {
        const cookie = new Cookies();
        if(cookie.get("userdata") === undefined)
            navigate('/');
    }, []);

    useEffect(() => {
        async function LoadData() {
            
            const data = await GetCountries();
            setCountry(data);
            const data2 = await GetCities();
            setCity(data2);
            
            const cookie = new Cookies();
            const user = await GetUserDetails(cookie.get('userdata').username);

            const values = {
                iduser: user.id,
                username: user.username,
                password: "",
                name: user.name,
                surname: user.surname,
                dni: user.dni,
                email: user.email,
                birthdate: user.birth,
                nationality: "PRY",
                phonecode: user.cellphone.slice(0, 4),
                phonenumber: user.cellphone.slice(-9),
                district: user.district,
                city: user.city,
                street: user.street,
                active:user.active
            };
            
            setUser(values);
        }
        LoadData();
    }, []);

    
    function ChangePassword(e) {
        setChangePass(!e.target.checked);
        if(e.target.checked)
        {
            txtPassword.current.setAttribute('required','');
            txtReplyPassword.current.setAttribute('required','');
            txtNewPassword.current.setAttribute('required','');
        }else{
            txtPassword.current.setAttribute('required',null);
            txtReplyPassword.current.setAttribute('required',null);
            txtNewPassword.current.setAttribute('required',null);
        }
    }

    function OnChangeEvent(event) {
        setUser({ ...user, [event.target.name]: event.target.value });
    }


    async function OnValidate(event) {
        var usercase = false;
        if (event.target.value === "")
            return;
        switch (event.target.name) {
            case 'newpassword':
                if (event.target.value.length > 0) {
                    ref = txtNewPassword;
                    invalidate = event.target.value.length < 8;
                }
                break;

            case 'replypassword':
                if (event.target.value.length > 0) {
                    ref = txtReplyPassword;
                    invalidate = user.newpassword !== event.target.value;
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

   async function OnSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        var change = 0;
        if(form.get('changepass') != null)
        {
            change = 1;
            const res = await TestPassword(user.username, user.password);

            if(!res)
            {
                txtPassword.current.classList.add("is-invalid");
                return;
            }
        }

        const values = {
            iduser: form.get('iduser'),
            password: form.get('newpassword'),
            name: form.get('name'),
            surname: form.get('surname'),
            email: form.get('email'),
            phonecode: form.get('phonecode'),
            phonenumber: form.get('phonenumber'),
            district: form.get('district'),
            city: form.get('city'),
            street: form.get('street'),
            active: 0,
            changepass: change
        };

        console.log(values)
        const res = await UpdateUserDetails(values);
       if(res)
        setShow(true);
    }

    function Showing(){
        setShow(false);
    }

    return (
        <form className='pt-2 text-white container register' ref={form} onSubmit={OnSubmit}>
            <h1 className='text-center '>Mi perfil</h1>
            <input type="hidden" value={user.iduser} name="iduser" />
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
                    <input type="checkbox" className="form-check-input" name="changepass" onChange={ChangePassword}></input>
                </div> </h5>

                <div className='flex-column justify-content-center p-3' >

                    <div className="justify-content-center" hidden={changePass}>

                        <div className="justify-content-center  pt-3">
                            <label htmlFor="idPass">Contraseña actual</label>
                            <input type="password" className="form-control bg-dark border-success text-white" min="8" id="idPass" placeholder="Contraseña" aria-describedby="inputGroupPrepend3"
                                 name='password' ref={txtPassword} value={user.password} onChange={OnChangeEvent} />
                            <div className="invalid-feedback">
                                Contraseñas incorrecta.
                            </div>
                        </div>

                        <div className="justify-content-center  pt-3">
                            <label htmlFor="idPass2">Nueva contraseña</label>
                            <input type="password" className="form-control bg-dark border-success text-white" id="idPassrep" placeholder="Nueva contraseña" aria-describedby="inputGroupPrepend3"
                                 name='newpassword' ref={txtNewPassword} value={user.newpassword} onBlur={OnValidate} onChange={OnChangeEvent} />
                            <div className="invalid-feedback">
                                Contraseñas debe contener al menos 8 caracteres.
                            </div>
                        </div>

                        <div className="justify-content-center  pt-3">
                            <label htmlFor="idPass2">Repetir contraseña</label>
                            <input type="password" className="form-control bg-dark border-success text-white" id="idPassrep2" placeholder="Repite la contraseña" aria-describedby="inputGroupPrepend3"
                                 name='replypassword' ref={txtReplyPassword} onBlur={OnValidate} />
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
            <Modal size="sm" backdrop="static" show={show} onHide={Showing} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Informacion </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    Usuario actualizado 😀
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>               
        </form>
    );
};


export default Profile;