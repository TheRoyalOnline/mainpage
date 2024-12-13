import React, {useEffect, useRef, useState} from "react";
import {FaArrowAltCircleRight} from "react-icons/fa";
import {RiCoinFill, RiCoinLine} from "react-icons/ri";
import {GiCreditsCurrency} from "react-icons/gi";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import {Modal, Spinner, Tab, Tabs} from "react-bootstrap";
import {
    FindUser,
    GetUserCredits,
    AssignToUser,
    TransactToUser,
    CreateEconomy,
    GetPositions,
    SetRankingPosition,
    SetRankingTimer, ForcedRanking
} from "./API";
import {GetGlobal} from "./APIExtras";
import CashingRequest from "./CashingRequest";
import OperationsRanking from "./OperationsRanking";
import OperationsAssign from "./OperationsAssign";

export const Operations = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [confirm, setConfirm] = useState(false);
    const [rankingDate, setRankingDate] = useState('');
    const [errMessage2, setErrMessage2] = useState('');
    const [userdata, setUserdata] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showAsing, setShowAsing] = useState(false);
    const [assign, setAsign] = useState(false);
    const [convertion, setConvertion] = useState(0);
    const [transact, setTransact] = useState(false);
    const [others, setOthers] = useState(false);
    const [showTable, setShowTable] = useState(true);
    const [user, setUser] = useState([]);
    const [user1, setUser1] = useState([]);
    const [user2, setUser2] = useState([]);
    const [opType, setOpType] = useState('');
    const [dni, setDni] = useState();
    const [typeConfirm, setTypeConfirm] = useState('');
    const [ccash, setCcash] = useState();
    const [ccredit, setCcredit] = useState();
    const [deposit, setDeposit] = useState();
    const [positions, setPositions] = useState([]);

    const [key, setKey] = useState('general');
    const refInputAssing = useRef(null);
    const refInputTransact = useRef(null);
    const refCheckAssing1 = useRef(null);
    const refCheckAssing2 = useRef(null);
    const refCheckTransact1 = useRef(null);
    const refCheckTransact2 = useRef(null);
    const refBtnConfirm = useRef(null);

    const access = {
        '1': [1, 1, 1, 1],
        '2': [1, 0, 1, 0],
        '3': [1, 0, 1, 0],
        '4': [1, 0, 1, 0],
        '5': [0, 0, 0, 0]
    }

    useEffect(() => {
        Starting();
        GetUserdata();
        const intervalId = setInterval(GetCredits, 5000);

        return () => clearInterval(intervalId);
    }, []);

    function GetUserdata() {
        const cookie = new Cookies();
        if (cookie.get("userdata") === undefined)
            navigate('/');

        setUserdata(cookie.get('userdata'));
        setShowAsing(access[cookie.get('userdata').role][0])
        setAsign(access[cookie.get('userdata').role][1])
        setTransact(access[cookie.get('userdata').role][2])
        setOthers(access[cookie.get('userdata').role][3])

    }

    async function Starting() {
        setIsLoading(true);
        GetCredits();
        const c = await GetGlobal('convertion');
        const d = await GetGlobal('ranking_date');
        const list = await GetPositions();
        setPositions(list);
        setRankingDate(d);
        setConvertion(c);
        setIsLoading(false);
    }

    async function GetCredits() {
        const cookie = new Cookies();
        const cre = await GetUserCredits(cookie.get('userdata').iduser);
        setUserdata(u => ({...u, ...cre}));
    }

    function ShowMovements() {
        const props = {iduser: userdata.iduser, role: userdata.role};
        navigate('/Operations/Movements', {state: props})
    }

    function EditUsers() {
        navigate('/Operations/List')
    }


    function EditGame() {
        navigate('/Operations/Editgame')
    }

    function CallModal(e) {
        setOpType(e);
        setShowModal(!showModal);
    }

    function OnChange(e) {
        switch (e.target.name) {
            case 'dni':
                setDni(e.target.value)
                break;

            case 'amount1':
                setUser1({...user1, amount: e.target.value})
                break;

            case 'amount2':
                setUser2({...user2, amount: e.target.value})
                break;

            case 'assigntype':
                setUser1({...user1, type: e.target.value})
                break;

            case 'transacttype':
                setUser2({...user2, type: e.target.value})
                break;

            case 'ccash':
                setCcash(e.target.value)
                break;
            case 'ccredit':
                setCcredit(e.target.value)
                break;

            case 'cdeposit':
                setDeposit(e.target.value)
                break;
        }
    }

    async function Search(e) {
        setErrMessage2('');
        const u = await FindUser(dni);
        if (u.iduser !== undefined) {
            setUser(u);
            if (userdata.iduser === u.iduser) {
                setErrMessage2('No se puede interactuar con uno mismo.');
                setShowModal(false);
                return;
            }
            if (userdata.role > u.role) {
                setErrMessage2('No se puede interactuar con usuarios de rol superior.');
                setShowModal(false);
                return;
            }
            setShowTable(false);
        }
    }

    async function Assign(e) {
        if (opType === 'op1')
            setUser1(u => ({...u, ...user}));
        else {
            setUser2(u => ({...u, ...user}));
            const cre = await GetUserCredits(user.iduser);

            setUser2(u => ({...u, ...cre}));
        }
        setUser([]);
        setShowModal(false);
        setShowTable(true);
        setDni(0);
    }

    function OnSubmit(e) {
        e.preventDefault();
        setTypeConfirm('');
        switch (e.target.name) {
            case 'assign':
                if (user1.iduser === undefined)
                    return;

                setTypeConfirm('assign');
                setShowConfirmDialog(true);

                break;

            case 'transact':
                setErrMessage2('');
                if (user2.iduser === undefined) {
                    setErrMessage2('Ingresar operador para la transaccion.');
                    return;
                }

                if (user2.type === "buy") {
                    if ((parseFloat(userdata.cash) < (parseFloat(user2.amount) * convertion))) {
                        setErrMessage2('Monto debe ser inferior o igual al efectivo poseido.');
                        return;
                    }

                    if (parseFloat(user2.credits) < parseFloat(user2.amount)) {
                        setErrMessage2('Monto debe ser inferior o igual al credito poseido por el operador.');
                        return;
                    }
                } else if (user2.type === "sell" && parseFloat(userdata.credits) < (parseFloat(user2.amount))) {
                    setErrMessage2('Monto debe ser inferior o igual al credito poseido por el operador.');
                    return;
                }

                setTypeConfirm('transact');
                setShowConfirmDialog(true);
                break;

            case 'createcash':
                setTypeConfirm('createcash');
                setShowConfirmDialog(true);
                break;

            case 'createcredit':
                setTypeConfirm('createcredit');
                setShowConfirmDialog(true);
                break;

            case 'deposit':
                setTypeConfirm('deposit');
                setShowConfirmDialog(true);
                break;
        }
    }

    function Validate(type, amount) {
        if (amount > 0)
            switch (type) {
                case 'credits':
                    if (amount < parseFloat(userdata.credits))
                        return true;
                    break;

                case 'money':
                    if (amount < parseFloat(userdata.cash))
                        return true;
                    break;
            }

        return false;
    }


    async function ConfirmSubmit() {
        refBtnConfirm.current.disabled = true;
        if (confirm) return;
        setConfirm(true);
        var res = 0;
        switch (typeConfirm) {
            case 'assign':
                user1.from = userdata.iduser;
                user1.for = user1.iduser;

                if (user1.type === 'credits' && Validate('credits', user1.amount)) {
                    user1.credits = user1.amount;
                    user1.cash = 0;
                } else if (Validate('money', user1.amount)) {
                    user1.cash = user1.amount;
                    user1.credits = 0;
                }

                res = await AssignToUser(user1);
                break;

            case 'transact':
                user2.from = userdata.iduser;
                user2.for = user2.iduser;
                user2.credits = parseFloat(user2.amount);
                user2.cash = parseFloat(user2.amount) * convertion;
                res = await TransactToUser(user2);
                break;

            case 'createcash':
                const data = {
                    from: userdata.iduser,
                    credits: 0,
                    cash: ccash,
                    code: 'CEFEC'
                }
                res = await CreateEconomy(data);
                break;

            case 'createcredit':
                const data2 = {
                    from: userdata.iduser,
                    credits: ccredit,
                    cash: 0,
                    code: 'CCRED'
                }
                res = await CreateEconomy(data2);
                break;

            case 'deposit':
                const data3 = {
                    from: userdata.iduser,
                    credits: 0,
                    cash: -deposit,
                    code: 'DEFEC'
                }
                res = await CreateEconomy(data3);
                break;

            case 'forced':
                res = await ForcedRanking();
                break;
        }
        if (res === 200)
            Reset();
    }

    function Reset() {

        setErrMessage2('');
        // setUserdata({});
        setShowModal(false)
        setShowConfirmDialog(false)
        //setShowAsing(false)
        //setAsign(false)
        setConvertion(0)
        //setTransact(false)
        //setOthers(false)
        setUser({});
        setUser1({});
        setUser2({});
        setOpType('')
        setDni()
        setCcash()
        setCcredit()
        setDeposit()
        setConfirm(false)
        refInputTransact.current.value = 0;
        refInputAssing.current.value = 0;
        refCheckTransact1.current.checked = false;
        refCheckTransact2.current.checked = false;
        refCheckAssing1.current.checked = false;
        refCheckAssing2.current.checked = false;
        refBtnConfirm.current.disabled = false;
        Starting();
    }

    function OpenCommissions(e) {
        const cookie = new Cookies();
        navigate('/Operations/Commissions', {
            state: {
                username: cookie.get("userdata").username,
                iduser: cookie.get("userdata").iduser
            }
        });
    }

    function OpenSimulator() {
        navigate('/Simulator');
    }

    function SetPositions(index, value) {
        const data = [...positions];
        data[index] = {...data[index], prize: value, modified: true};
        setPositions(data);
    }

    async function UpdateDate(e) {
        e.target.disabled = true;
        const update = await SetRankingTimer(rankingDate);
        if (update === 200)
            e.target.disabled = false;
    }

    async function UpdatePrizes(e) {
        e.target.disabled = true;
        for (const item of positions) {
            if (item.modified)
                await SetRankingPosition(item.position, item.prize);
        }

        e.target.disabled = false;
    }

    if (isLoading)
        return <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <Spinner className="spinner-grow text-success" animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
        </div>

    return (
        <>
            <div className='pt-2 text-white container register'>
                <h1 className='text-center'>Operaciones</h1>
                <h2 className='text-center'>{userdata.surname}, {userdata.firstname} - {userdata.rolename}</h2>

                <Tabs id="controlled-tab-example"
                      activeKey={key}
                      onSelect={(k) => setKey(k)}
                      className="border-0 mt-3">
                    <Tab eventKey="general" title="Datos generales"
                         tabClassName={key === "general" ? "bg-success text-white border-success" : "bg-transparent text-white"}
                         className=' card border-success text-white bg-transparent'>


                        <div className='border-success text-white bg-transparent'>
                            <h5 className="card-header border-success text-white">Datos operacionales</h5>

                            <div className='flex-column p-3'>
                                {
                                    showAsing ? (
                                        <div>
                                            <div className="form-group justify-content-center row pt-3">
                                                <label htmlFor="as"
                                                       className="col-sm-3 col-form-label">Asignacion</label>
                                                <div className="col-sm-5">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend ">
                                                    <span
                                                        className="input-group-text bg-success border-success text-white text-white h-100"
                                                        id="idUser"><GiCreditsCurrency/></span>
                                                        </div>
                                                        <input type="text" id="as"
                                                               className="form-control bg-dark border-success text-white"
                                                               value={parseFloat((parseFloat(userdata.credits) * convertion) + parseFloat(userdata.cash)).toLocaleString()}
                                                               readOnly/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group justify-content-center row pt-3">
                                                <label htmlFor="mon"
                                                       className="col-sm-3 col-form-label">Guaranies</label>
                                                <div className="col-sm-5">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend ">
                                                    <span
                                                        className="input-group-text bg-success border-success text-white text-white h-100"
                                                        id="idUser"><GiCreditsCurrency/></span>
                                                        </div>
                                                        <input type="text" id="mon"
                                                               className="form-control bg-dark border-success text-white"
                                                               value={parseFloat(userdata.cash).toLocaleString()}
                                                               readOnly/>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    ) : null
                                }

                                <div className="form-group justify-content-center row pt-3">
                                    <label className="col-sm-3 col-form-label">Creditos</label>
                                    <div className="col-sm-5">
                                        <div className="input-group">
                                            <div className="input-group-prepend ">
                                        <span
                                            className="input-group-text bg-success border-success text-white text-white h-100"
                                            id="idUser"><RiCoinFill/></span>
                                            </div>
                                            <input type="number"
                                                   className="form-control bg-dark border-success text-white"
                                                   value={userdata.credits} readOnly/>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        {
                            transact ? (
                                <form className='pt-2 text-white register' name="transact" id="transact"
                                      onSubmit={OnSubmit}>
                                    <div className='border-success text-white bg-transparent mt-5'>
                                        <h5 className="card-header border-success text-white">Transacciones</h5>

                                        <div className='d-flex justify-content-center p-3'>
                                            <div className="form-check form-check-inline">
                                                <input ref={refCheckTransact1} className="btn-check" type="radio"
                                                       name="transacttype" id="idsell" value="sell" onChange={OnChange}
                                                       required/>
                                                <label className="btn btn-outline-success text-white" htmlFor="idsell">
                                                    Vender
                                                </label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input ref={refCheckTransact2} className="btn-check" type="radio"
                                                       name="transacttype" id="idpay" value="buy" onChange={OnChange}
                                                       required/>
                                                <label className="btn btn-outline-success text-white" htmlFor="idpay">
                                                    Comprar
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-group justify-content-center row pt-3">
                                            <label htmlFor="monto" className="col-sm-2 col-form-label">Monto</label>
                                            <div className="col-sm-5">
                                                <div className="input-group">
                                                    <div className="input-group-prepend ">
                                            <span
                                                className="input-group-text bg-success border-success text-white text-white h-100"><RiCoinFill/></span>
                                                    </div>
                                                    <input ref={refInputTransact} type="number"
                                                           className="form-control bg-dark border-success text-white"
                                                           value={user2.amount} min={1} name='amount2'
                                                           onChange={OnChange}
                                                           required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <div className="form-inline">
                                                <label htmlFor="label1">Conversion:</label>
                                                <label className="p-1"
                                                       id="label1"><b>₲ {user2.amount !== undefined ? parseFloat(parseFloat(user2.amount) * convertion).toLocaleString() : 0}</b></label>
                                            </div>
                                        </div>

                                        <div className='d-flex justify-content-center'>
                                            <div className="form-inline">
                                                <label htmlFor="label1 ">Asignado a:</label>
                                                <label className="p-3"
                                                       id="label1"><b>{user2.iduser !== undefined ? '(' + user2.dni + ') ' + user2.surname + ', ' + user2.name : 'Sin Asignacion'}</b></label>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <div className="form-inline">
                                                <label className="p-3"
                                                       id="label1"><b>{(user2.credits !== undefined ? parseFloat(user2.credits) : 0) + ' Creditos'}</b></label>
                                                {
                                                    userdata.role === 1 ? (<label className="p-3"
                                                                                  id="label1"><b>₲ {(user2.cash !== undefined ? parseInt(user2.cash).toLocaleString() : 0)}</b></label>
                                                        )
                                                        : null
                                                }

                                                <label className="p-3"
                                                       id="label1"><b>Rol: {(user2.rolename !== undefined ? user2.rolename : 'No definido')}</b></label>
                                            </div>
                                        </div>
                                        <label className="text-center text-danger"><b>{errMessage2}</b></label>
                                        <h5 className="card-header border-success text-white pt-4"></h5>
                                        <div className='text-center mt-3 mb-4'>
                                            <div className="form-group ">
                                                <div className='d-flex flex-column container w-75'>
                                                    <button className="btn btn-purple mt-3 text-white" type="button"
                                                            name="findb"
                                                            onClick={() => CallModal('op2')}>Seleccionar usuario
                                                    </button>
                                                </div>
                                                <div className='d-flex flex-column container w-75'>
                                                    <button className="btn btn-success mt-3" type="submit">Confirmar
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </form>

                            ) : null
                        }

                    </Tab>
                    {
                        userdata.role === 1 && (
                            <Tab eventKey="ranking" title="Ranking"
                                 tabClassName={key === "ranking" ? "bg-success text-white border-success" : "bg-transparent text-white"}
                                 className='card border-success text-white bg-transparent'>
                                <OperationsRanking role={userdata.role} rankingDate={rankingDate}
                                                   setRankingDate={setRankingDate} UpdateDate={UpdateDate}
                                                   positions={positions}
                                                   SetPositions={SetPositions} UpdatePrizes={UpdatePrizes}/>
                            </Tab>)
                    }

                    {
                        userdata.role === 1 && (
                            <Tab eventKey="assign" title="Asignaciones"
                                 tabClassName={key === "assign" ? "bg-success text-white border-success" : "bg-transparent text-white"}
                                 className='card border-success text-white bg-transparent'>
                                <OperationsAssign role={userdata.role} OnSubmit={OnSubmit}
                                                  refCheckAssing1={refCheckAssing1}
                                                  OnChange={OnChange} refCheckAssing2={refCheckAssing2}
                                                  refInputAssing={refInputAssing} user1={user1}
                                                  CallModal={CallModal}/>
                            </Tab>)
                    }


                    <Tab eventKey="prize" title="Cobros"
                         tabClassName={key === "prize" ? "bg-success text-white border-success" : "bg-transparent text-white"}
                         className='card border-success text-white bg-transparent'>
                        <CashingRequest canAccess={userdata.role === 5} convertion={convertion} iduser={userdata.iduser}
                                        credits={userdata.credits}/>
                    </Tab>

                    <Tab eventKey="others" title="Otros"
                         tabClassName={key === "others" ? "bg-success text-white border-success" : "bg-transparent text-white"}
                         className='card border-success text-white bg-transparent'>
                        <div className="row px-5 pt-3 pb-3 gap-3">
                            <button className="btn btn-success p-2" onClick={ShowMovements}>Ver movimientos</button>

                            {
                                [1, 2].includes(userdata.role) ? (
                                        <button className="btn btn-info" onClick={EditUsers}>Lista de usuarios</button>
                                    )
                                    : null
                            }
                            {
                                [2, 3, 4].includes(userdata.role) ? (
                                        <button className="btn btn-primary" onClick={OpenCommissions}>Ver
                                            comisiones</button>
                                    )
                                    : null
                            }
                            {
                                userdata.role === 1 ? (
                                        <button className="btn btn-danger p-2" onClick={()=>{
                                            setTypeConfirm('forced');
                                            setShowConfirmDialog(true);
                                        }}>Forzar premiacion del
                                            ranking
                                        </button>
                                    )
                                    : null
                            }
                            {
                                userdata.role === 1 ? (
                                        <button className="btn btn-purple p-2" onClick={OpenSimulator}>Simulador</button>
                                    )
                                    : null
                            }
                        </div>
                        {
                            others ? (
                                <div className='text-white register' name='others'>
                                    <div className='border-success text-white bg-transparent mt-2'>
                                        <h5 className="card-header border-success text-white">Movimientos</h5>

                                        <div className='flex-column p-3'>
                                            <form className="form-group row justify-content-center pt-3"
                                                  id='createcredit'
                                                  name="createcredit" onSubmit={OnSubmit}>
                                                <label htmlFor="idNombre" className="col-sm-4 col-form-label">Crear
                                                    creditos</label>
                                                <div className="col-sm-5">
                                                    <input type="number"
                                                           className="form-control bg-dark border-success text-white"
                                                           min={1} name="ccredit" value={ccredit} required
                                                           onChange={OnChange}/>
                                                </div>
                                                <div className="col-sm-2">
                                                    <button className="btn btn-success" type="submit">
                                                        <FaArrowAltCircleRight/>
                                                    </button>
                                                </div>
                                            </form>

                                            <form className="form-group row justify-content-center pt-3" id="createcash"
                                                  name="createcash" onSubmit={OnSubmit}>
                                                <label htmlFor="idNombre" className="col-sm-4 col-form-label">Ingresar
                                                    efectivo</label>
                                                <div className="col-sm-5">
                                                    <input type="number"
                                                           className="form-control bg-dark border-success text-white"
                                                           min={1} name="ccash" value={ccash} required
                                                           onChange={OnChange}/>
                                                </div>
                                                <div className="col-sm-2">
                                                    <button className="btn btn-success" type="submit">
                                                        <FaArrowAltCircleRight/>
                                                    </button>
                                                </div>
                                            </form>

                                            <form className="form-group row justify-content-center pt-3" id="deposit"
                                                  name="deposit"
                                                  onSubmit={OnSubmit}>
                                                <label htmlFor="idNombre" className="col-sm-4 col-form-label">Depositar
                                                    efectivo</label>
                                                <div className="col-sm-5">
                                                    <input type="number"
                                                           className="form-control bg-dark border-success text-white"
                                                           min={1} name="cdeposit" value={deposit} required
                                                           onChange={OnChange}/>
                                                </div>
                                                <div className="col-sm-2">
                                                    <button className="btn btn-success" type="submit">
                                                        <FaArrowAltCircleRight/>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>

                            ) : null
                        }
                    </Tab>
                </Tabs>
            </div>


            <Modal className="container-fluid" backdrop="static" show={showModal} onHide={CallModal}
                   size="lg"
                   centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Buscar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        <label htmlFor="idNombre" className="col-sm-2 col-form-label">Cedula</label>
                        <div className="col-sm-5">
                            <input type="number" className="form-control bg-dark border-success text-white"
                                   id="dni"
                                   value={dni} name='dni' onChange={OnChange}/>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-success" type="button" onClick={Search}>
                                <FaArrowAltCircleRight/>
                            </button>
                        </div>
                    </div>
                    <div className="table-responsive pt-4" hidden={showTable}>
                        <table className="table table-dark table-striped text-center">
                            <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Cedula</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td>{user.dni}</td>
                                <td>{user.email}</td>
                                <td>
                                    <div className="form-group">
                                        <button className="btn btn-success" type="button"
                                                onClick={Assign}>Asignar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

            <Modal className="container-fluid" backdrop="static" show={showConfirmDialog}
                   onHide={() => setShowConfirmDialog(false)} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmacion 🤔</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Esta seguro que desea confirmar la operacion?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button ref={refBtnConfirm} className="btn btn-success"
                            onClick={ConfirmSubmit}>Confirmar
                    </button>
                </Modal.Footer>
            </Modal>

        </>


    );
};
