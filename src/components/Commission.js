import React, { useEffect, useRef, useState } from "react";
import { UserCommission, UserCommissionAud } from "./API";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { Modal, ProgressBar } from "react-bootstrap";
import { ShowDialog } from "./Dialogs";

const Commission = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState(0);
    const roles = [1,2];
    const today = new Date();
    const refBtnConfirm = useRef(null);
    const [confirm, setConfirm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [commission, setCommission] = useState([]);
    const [until, setUntil] = useState(today.toISOString().split('T')[0]);
    const [since, setSince] = useState(today.toISOString().split('T')[0]);
    const [total, setTotal] =useState(0.0);
    const location = useLocation();

    const [loading, setLoading] = useState(false);

    useState(()=>{
        Start();
    }, []);


    function Start() {
        const cookie = new Cookies();
        if (cookie.get("userdata") === undefined)
            navigate('/');
        setRole(cookie.get("userdata").role );
        GetCommissions();
    }

    async function GetCommissions() {
        setLoading(true);
        setTotal(0.0);
        const com = await UserCommission(location.state.iduser, since, until);
        setCommission(com);
        var sum = 0;
        com.forEach(item=>{
            sum += parseFloat(item.commission);
        });
        setTotal(sum);

        if(com.length > 0){
            const lastdate = new Date(com[com.length - 1].createdat)
            const unt = lastdate.toISOString().split('T')[0] + ' ' + lastdate.toISOString().split('T')[1].substring(0, 8);
            setUntil(unt);
        }

        setLoading(false);
    }

    async function CommissionAud(){
        const res = await UserCommissionAud(location.state.iduser, since,until,total);
        if(res === 200)
        {            
            setConfirm(false);
            refBtnConfirm.current.disabled = false;
            setShowConfirmDialog(false);
            GetCommissions();
        }
    }

    function OnChangeDate(event){
        if(event.target.name === "since")
            setSince(event.target.value);
        else
            setUntil(event.target.value);
    }

    
    function ConfirmSubmit() {
        refBtnConfirm.current.disabled = true;
        if (confirm) return;
        setConfirm(true);
        CommissionAud();
    }

    function Cobrar(e){

        if(total > 0)
            setShowConfirmDialog(true);
        else
            setShowModal(true);

    }

    return (
        <>
            <div className='pt-2 text-white container' >
                <h1 className='text-center '>Lista de comisiones pendientes</h1>
                <div className='card border-success text-white bg-transparent mt-5'>

                    <h5 className="card-header border-success text-white pt-4">Vendedor: <span className="text-info">{location.state.username.toUpperCase()}</span></h5>

                    <div className='flex-column p-3' >
                    {/*    <div className="form-group justify-content-center row pt-3">*/}
                    {/*        <label className="col-sm-3 col-form-label">Desde:</label>*/}
                    {/*        <div className="col-sm-5">*/}
                    {/*            <div className="input-group">*/}
                    {/*                <input type="date" className=" input-group-text bg-dark border-success text-white  h-100 calendar" value={since} name="since" onChange={OnChangeDate} />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="form-group justify-content-center row pt-3">*/}
                    {/*        <label className="col-sm-3 col-form-label">Hasta:</label>*/}
                    {/*        <div className="col-sm-5">*/}
                    {/*            <div className="input-group">*/}
                    {/*                <input type="date" className="input-group-text bg-dark border-success text-white h-100" value={until} name="until" onChange={OnChangeDate} />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                        <div className="form-group row pt-3">

                                {/*<div className="input-group">*/}
                                {/*    <button className="btn btn-warning" onClick={(e) => GetCommissions()}>Buscar</button>*/}
                                {/*</div>*/}
                                {
                                    roles.includes(role) && (
                                        <div className="col-sm-5">
                                            <div className="input-group">
                                                <button className="btn btn-success" onClick={Cobrar} disabled={total <= 0}>{`Cobrar ${total.toFixed(2)} CRE`}</button>
                                            </div>
                                        </div>
                                    )
                                }

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
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={0}>
                                        <td></td>
                                        <td><b>TOTAL:</b></td>
                                        <td><b>{total.toFixed(2)}</b></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    {
                                        commission.map((item, index) => (
                                            <tr key={item.iduser}>
                                                <td><b>{index + 1}</b></td>
                                                <td>{item.username}</td>
                                                <td>{item.commission}</td>
                                                <td>{item.createdat}</td>
                                                <td>{item.status}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>


            </div>
            <Modal className="container-fluid" backdrop="static" show={showConfirmDialog} onHide={() => setShowConfirmDialog(false)} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmacion 🤔</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <p>Esta seguro que desea confirmar la operacion?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button ref={refBtnConfirm} className="btn btn-success" onClick={ConfirmSubmit}>Confirmar</button>
                </Modal.Footer>
            </Modal>

            <Modal show={loading} backdrop="static" keyboard={false} centered={true}>
                <Modal.Header>
                    <Modal.Title>CARGANDO.. ⌛</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProgressBar className="progress-bar progress-bar-striped bg-success progress-bar-animated" />
                </Modal.Body>
            </Modal>

            <ShowDialog  title={"Informacion"} message={"❌ No se puede generar comisiones negativas."} show={showModal} handler={()=>setShowModal(false)}/>
        </>
    );
};

export default Commission;