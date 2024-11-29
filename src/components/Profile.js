import React, {useEffect, useRef, useState} from "react";
import Cookies from "universal-cookie";
import {Modal, Spinner, Tab, Tabs} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {GetCities, GetCountries} from "./APIExtras";
import {GetEntities, GetUserDetails, TestPassword, UpdateUserDetails, UpdateUserPassword} from "./API";
import Entities from "./Entities";

export const Profile = () => {
    const initialValues = {
        iduser: 0,
        username: "",
        password: "",
        newpassword: "",
        replypassword: "",
        firstname: "",
        surname: "",
        dni: "",
        email: "",
        birthdate: new Date().toISOString().split('T')[0],
        nationality: "PRY",
        cellphonecode: "+595",
        cellphonenumber: "",
        iddistrict: 1,
        city: "",
        address: "",
        active: 0,
        iduser_entity: 0,
        entity: 1,
        numbercode: "",
        namecode: "",
        dnicode: "",
        alias: "",
        alias_type: 1,
    };

    const [key, setKey] = useState('general');
    const navigate = useNavigate();
    const form = useRef(null);
    const [changePass, setChangePass] = useState(true);
    const txtPassword = useRef(null);
    const txtNewPassword = useRef(null);
    const txtReplyPassword = useRef(null);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(initialValues);
    const [countries, setCountry] = useState([]);
    const [cities, setCity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [canUpdatePassword, setCanUpdatePassword] = useState(false);

    useEffect(() => {
        const cookie = new Cookies();
        if (cookie.get("userdata") === undefined) navigate('/');
        LoadData();
    }, []);


    async function LoadData() {
        setIsLoading(true);

        const data = await GetCountries();
        setCountry(data);
        const data2 = await GetCities();
        setCity(data2);

        const cookie = new Cookies();
        const u = await GetUserDetails(cookie.get('userdata').username);
        setUser(u);
        setIsLoading(false);
    }

    function ChangePassword(e) {
        setChangePass(!e.target.checked);
        if (e.target.checked) {
            setUser({...user, change: 1});
            txtPassword.current.setAttribute('required', '');
            txtReplyPassword.current.setAttribute('required', '');
            txtNewPassword.current.setAttribute('required', '');
        } else {
            setUser({...user, change: 0});
            txtPassword.current.setAttribute('required', null);
            txtReplyPassword.current.setAttribute('required', null);
            txtNewPassword.current.setAttribute('required', null);
        }
    }

    function OnChangeEvent(event) {
        setUser({...user, [event.target.name]: event.target.value});
    }


    async function OnValidate() {
        ShowError(txtNewPassword,user.newpassword.length < 8)
        ShowError(txtReplyPassword, user.newpassword !== user.replypassword)
        setCanUpdatePassword(ValidateNewPasswords());
    }

    function ShowError(ref, isInvalid) {
        if (isInvalid) {
            ref.current.classList.add("is-invalid");
            ref.current.classList.remove("border-success");
        } else {
            ref.current.classList.remove("is-invalid");
            ref.current.classList.add("border-success");
        }
    }

    async function OnSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const res = await UpdateUserDetails(user);
        if (res) setShow(true);
        setIsLoading(false);
    }

    async function OnUpdatePassword(e) {
        e.preventDefault();
        setIsLoading(true);
        const res = await UpdateUserPassword(user);
        if (200 === res) {
            setShow(true);
            setUser({...user, password: ""});
            setUser({...user, newpassword: ""});
            setUser({...user, replypassword: ""});

            txtPassword.current.value = "";
            txtNewPassword.current.value = "";
            txtReplyPassword.current.value = "";
        }
        setIsLoading(false);
    }

    async function PasswordVerification(e) {
        const res = await TestPassword(user.username, user.password);

        if (!res) {
            setCanUpdatePassword(false);
            txtPassword.current.classList.add("is-invalid");
            txtPassword.current.classList.remove("border-success");
        } else {
            setCanUpdatePassword(ValidateNewPasswords());
            txtPassword.current.classList.remove("is-invalid");
            txtPassword.current.classList.add("border-success");
        }
    }

    function ValidateNewPasswords() {
        return user.newpassword === user.replypassword
            && user.newpassword.length >= 8 && user.password.length >= 4;
    }


    function Showing() {
        setShow(false);
    }

    if (isLoading) return (<div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
        <Spinner className="spinner-grow text-success" animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
        </Spinner>
    </div>)

    return (
        <div className='pt-2 text-white container register'>
            <h1 className='text-center mt-2'>Mi perfil</h1>
            <Tabs id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="border-0 mt-3">
                <Tab eventKey="general" title="Datos generales"
                     tabClassName={key === "general" ? "bg-success text-white border-success" : "bg-transparent text-white"}
                     className=' card border-success text-white bg-transparent'
                >
                    <form ref={form} onSubmit={OnSubmit}>

                        <div className='flex-column justify-content-center p-3'>
                            <h5 className="card-header border-success text-white pt-4">Informacion personal</h5>
                            <div className="justify-content-center pt-3">
                                <label htmlFor="idNombre">Nombre</label>
                                <input type="text" className="form-control bg-dark border-success text-white"
                                       id="idNombre"
                                       value={user.firstname} required name='firstname'
                                       onChange={OnChangeEvent}/>
                            </div>

                            <div className="justify-content-center  pt-3">
                                <label htmlFor="idSurname">Apellido</label>
                                <input type="text" className="form-control bg-dark border-success text-white"
                                       id="idSurname"
                                       value={user.surname} required name='surname'
                                       onChange={OnChangeEvent}/>
                            </div>

                            <div className="justify-content-center  pt-3">
                                <label htmlFor="idmail">Email</label>
                                <input type="email" className="form-control bg-dark border-success text-white"
                                       id="idmail"
                                       value={user.email} required name='email'
                                       onChange={OnChangeEvent}/>
                            </div>

                            <div className="justify-content-center pt-3">
                                <label htmlFor="idcod">Movil</label>
                                <div className='d-flex'>
                                    <select className="form-select w-50 bg-dark border-success text-white"
                                            id="idcod"
                                            value={user.cellphonecode} name='cellphonecode'
                                            onChange={OnChangeEvent}
                                            required>
                                        {countries.map((item) => (<option key={item.id}
                                                                          value={item.phone}>{item.id + ": " + item.phone}</option>))}
                                    </select>
                                    <input type="text"
                                           className="form-control flex-fill bg-dark border-success text-white"
                                           id="idmovil" value={user.cellphonenumber} name='cellphonenumber'
                                           onChange={OnChangeEvent}
                                           required maxLength={13}/>

                                </div>

                            </div>


                            <h5 className="card-header border-success text-white pt-4">Dirección</h5>

                            <div className='flex-column justify-content-center p-3'>
                                <div className="justify-content-center pt-3">
                                    <label htmlFor="idDir">Distrito</label>
                                    <select className="form-select bg-dark border-success text-white"
                                            id="idDistrito"
                                            value={user.iddistrict} name='iddistrict' onChange={OnChangeEvent} required>
                                        {cities.map(item => (
                                            <option key={item.id} value={item.id}>{item.city}</option>))}
                                    </select>
                                </div>
                                <div className="justify-content-center pt-3">
                                    <label htmlFor="idCiudad">Ciudad</label>
                                    <input type="text" className="form-control bg-dark border-success text-white"
                                           id="idCiudad"
                                           placeholder="Ciudad" value={user.city} name='city'
                                           onChange={OnChangeEvent}
                                           required/>
                                </div>
                                <div className="justify-content-center pt-3">
                                    <label htmlFor="idCalle">Calle</label>
                                    <input type="text" className="form-control bg-dark border-success text-white"
                                           id="idCalle"
                                           placeholder="Calle" value={user.address} name='address'
                                           onChange={OnChangeEvent}
                                           required/>
                                </div>
                            </div>


                        </div>
                        <div className='text-center mt-3 mb-4'>
                            <div className="form-group ">

                                <div className='d-flex flex-column container w-75'>
                                    <button className="btn btn-success mt-3" type="submit">Actualizar</button>
                                </div>

                            </div>
                        </div>
                    </form>


                </Tab>
                <Tab title="Banco" eventKey="bancos" className='card border-success bg-transparent  pb-2'
                     tabClassName={key === "bancos" ? "bg-success text-white  border-success" : "bg-transparent text-white"}>
                    <Entities OnChangeEvent={OnChangeEvent} user={user}/>
                    <div className='text-center mt-3 mb-4'>
                        <div className="form-group ">

                            <div className='d-flex flex-column container w-75'>
                                <button className="btn btn-success mt-3" type="button" onClick={OnSubmit}>Actualizar
                                </button>
                            </div>

                        </div>
                    </div>
                </Tab>
                <Tab title="Cambiar contraseña" eventKey="password" className='card border-success bg-transparent pb-2'
                     tabClassName={key === "password" ? "bg-success text-white  border-success" : "bg-transparent  text-white"}>
                    <div className='flex-column justify-content-center p-3'>

                        <div className="justify-content-center">

                            <div className="justify-content-center  pt-3">
                                <label htmlFor="idPass">Contraseña actual</label>
                                <input type="password"
                                       className="form-control bg-dark border-success text-white"
                                       min="8"
                                       id="idPass" placeholder="Contraseña"
                                       aria-describedby="inputGroupPrepend3"
                                       name='password' ref={txtPassword} value={user.password}
                                       onChange={OnChangeEvent}
                                       onBlur={PasswordVerification}
                                />

                                <div className="invalid-feedback">
                                    Contraseña incorrecta.
                                </div>
                            </div>

                            <div className="justify-content-center  pt-3">
                                <label htmlFor="idPass2">Nueva contraseña</label>
                                <input type="password"
                                       className="form-control bg-dark border-success text-white"
                                       id="idPassrep" placeholder="Nueva contraseña"
                                       aria-describedby="inputGroupPrepend3"
                                       name='newpassword' ref={txtNewPassword} value={user.newpassword}
                                       onBlur={OnValidate}
                                       onChange={OnChangeEvent}/>
                                <div className="invalid-feedback">
                                    Contraseñas debe contener al menos 8 caracteres.
                                </div>
                            </div>

                            <div className="justify-content-center  pt-3">
                                <label htmlFor="idPass2">Repetir contraseña</label>
                                <input type="password"
                                       className="form-control bg-dark border-success text-white"
                                       id="idPassrep2" placeholder="Repite la contraseña"
                                       aria-describedby="inputGroupPrepend3"
                                       name='replypassword' onChange={OnChangeEvent} ref={txtReplyPassword}
                                       onBlur={OnValidate} value={user.replypassword}/>
                                <div className="invalid-feedback">
                                    Contraseñas no coinciden.
                                </div>
                            </div>
                        </div>
                        <div className='text-center mt-3 mb-4'>
                            <div className="form-group ">

                                <div className='d-flex flex-column container w-75'>
                                    <button className="btn btn-success mt-3" type="button"
                                            onClick={OnUpdatePassword} disabled={!canUpdatePassword}>Actualizar
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                </Tab>


            </Tabs>

            <Modal size="sm" backdrop="static" show={show} onHide={Showing} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Informacion </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Usuario actualizado 😀
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

        </div>


    )
};


export default Profile;