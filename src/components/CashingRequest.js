import React, {useEffect, useRef, useState} from 'react';
import {RiCoinFill} from "react-icons/ri";
import {Modal} from "react-bootstrap";
import Requests from "./Requests";
import {GetUserDetails, TransactToUser, UpdateUserDetails} from "./API";
import Entities from "./Entities";
import Cookies from "universal-cookie";

const CashingRequest = (props) => {
    const init = {
        from: 0,
        for: 0,
        credits: 0,
        cash: 0,
        type: "buy",
        iduser_entity: 0,
        entity: 1,
        numbercode: "",
        namecode: "",
        dnicode: "",
        alias: "",
        alias_type: 1,
        change: 0
    }
    const [user, setUser] = useState(init);
    const confirmRef = useRef(null);
    const [errMessage, seterrMessage] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [maxCredits, setMaxCredits] = useState(props.credits);
    useEffect(() => {
        Starting();
    }, []);

    async function Starting() {
        const cookies = new Cookies();
        const c = await GetUserDetails(cookies.get("userdata").username);
        setUser(c);
    }

    function OnChange(e) {
        setUser({...user, [e.target.name]: e.target.value});
    }

    function OnSubmit(e) {
        e.preventDefault();
        setUser(prevUser => ({
            ...prevUser,
            from: 0,
            for: props.iduser,
            type: "buy",
            cash: parseFloat(prevUser.credits) * props.convertion
        }));
        setShowDialog(true);
    }

    async function Confirm(e) {
        confirmRef.current.disabled = true;
        const res = await TransactToUser(user);
        const u = await UpdateUserDetails(user);
        if (res === 200) {
            setMaxCredits(maxCredits - user.credits);
            confirmRef.current.disabled = false;
            setShowDialog(false);
            setUser(init);
        }
    }

    return (
        <>
            {props.canAccess ? (
                <form className='text-white register' name="transact" id="transact" onSubmit={OnSubmit}>
                    <div className='border-success text-white bg-transparent'>
                        <h5 className="card-header border-success text-white">Solicitud de premio</h5>

                        <div className="form-group justify-content-center row pt-3">
                            <label htmlFor="monto" className="col-sm-2 col-form-label">Creditos</label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span
                                            className="input-group-text bg-success border-success text-white text-white h-100"><RiCoinFill/></span>
                                    </div>
                                    <input type="number"
                                           className="form-control bg-dark border-success text-white"
                                           value={user.credits} min={1} max={maxCredits} name='credits'
                                           onChange={OnChange} required/>

                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div className="form-inline">
                                <label htmlFor="label1">Cobro maximo:</label>
                                <label className="p-1"
                                       id="label1"><b>{maxCredits}</b></label>
                            </div>

                        </div>
                        <div className='d-flex justify-content-center'>
                            <div className="form-inline">
                                <label htmlFor="label1">Conversion:</label>
                                <label className="p-1"
                                       id="label1"><b>₲ {user.credits !== undefined ? parseFloat(parseFloat(user.credits) * props.convertion).toLocaleString() : 0}</b></label>
                            </div>

                        </div>

                        <Entities OnChangeEvent={OnChange} user={user}/>
                        <label className="text-center text-danger"><b>{errMessage}</b></label>
                        <h5 className="card-header border-success text-white pt-4"></h5>
                        <div className='text-center mt-3 mb-4'>
                            <div className="form-group ">

                                <div className='d-flex flex-column container w-75'>
                                    <button className="btn btn-success mt-3" type="submit">Confirmar</button>
                                </div>

                            </div>
                        </div>
                    </div>


                </form>

            ) : null
            }
            <Requests iduser={props.iduser} canFind={props.role !== 1}/>

            <Modal className="container-fluid" backdrop="static" show={showDialog} onHide={() => setShowDialog(false)}
                   centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmacion 🤔</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Esta seguro que desea confirmar la operacion?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button ref={confirmRef} className="btn btn-success" onClick={Confirm}>Confirmar</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CashingRequest;