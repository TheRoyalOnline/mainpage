import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Modal } from "react-bootstrap";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { RoomById, GamesSetup } from "./Game";
import { useLocation } from 'react-router-dom'

export const EditGame = () => {
    const location = useLocation();
    const [confirm, setConfirm] = useState(false);
    const [errMessage2, setErrMessage2] = useState('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [games, setGames] = useState([]);
    const [game, setGame] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [room, setRoom] = useState([]);
    const [roomDetails, setRoomDetails] = useState([])
    const refBtnConfirm = useRef(null);
    const [allSymbols, setAllSymbols] = useState([]);
    const [allCards, setAllCards] = useState([]);
    const [bonus, setBonus] = useState([]);
    const [sbonus, setSBonus] = useState([]);

    const symbols = {
        "1": "🦋",
        "2": "🍌",
        "3": "🐍",
        "4": "🪨",
        "5": "🍍",
        "6": "🦁",
        "7": "💀",
        "8": "⭐",
        "9": "🐒"
    }

    const cards = {
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
        "10": "10",
        "11": "J",
        "12": "Q",
        "13": "K",
        "14": "A",
        "15": "🃏"
    }


    async function Starting() {
        const cookie = new Cookies();
        if (cookie.get("userdata") === undefined)
            navigate('/');

        try {
            const setup = await RoomById(location.state.idroom)
            setRoom(setup);

            const roomDetailsData = JSON.parse(setup.setup);
            setRoomDetails(roomDetailsData);

            const symbols = roomDetailsData.items;
            const riskPercents = roomDetailsData.RiskPercents;
            const BPrizes = roomDetailsData.BPrizes;
            const SBPrizes = roomDetailsData.SBPrizes;

            setAllSymbols(symbols);
            setAllCards(riskPercents);
            setBonus(BPrizes);
            setSBonus(SBPrizes);
        } catch (error) {

        }
    }

    useEffect(() => {
        Starting();
    }, [])

    function OnSubmit(e) {
        e.preventDefault();
        setShowConfirmDialog(true);
    }

    async function ConfirmSubmit(e) {
        refBtnConfirm.current.disabled = true;
        if (confirm) return;
        setConfirm(true);
        
        roomDetails.items = allSymbols;
        roomDetails.RiskPercents = allCards;
        roomDetails.BPrizes = bonus;
        roomDetails.SBPrizes = sbonus;
        
         var res = 0;
         res = await GamesSetup(room.id, roomDetails);

        Starting();
        refBtnConfirm.current.disabled = false;
        setConfirm(false);
        CallModal();
    }

    function ChangeSetup(e) {
        setRoomDetails({ ...roomDetails, [e.target.name]: parseFloat(e.target.value) });
    }

    function CallModal() {
        setShowConfirmDialog(!showConfirmDialog);
    }

    function ChangeTable(id, value, type) {
        var aux = undefined;
        var newvalue = undefined;
        switch (type) {
            case "symbols":
                aux = [...allSymbols];
                newvalue = aux.find(c => c.id === id);

                if (newvalue) {
                    newvalue.percent =  parseFloat(value);
                    setAllSymbols(aux);
                }
                break;
            case "cards":
                aux = [...allCards];
                newvalue = aux.find(c => c.value === id);

                if (newvalue) {
                    newvalue.percent = parseFloat(value);
                    setAllCards(aux);
                }
                break;
            case "bonus":
                aux = [...bonus];
                newvalue = aux.find(c => c.minPrize === id);

                if (newvalue) {
                    newvalue.percent = parseFloat(value);
                    setBonus(aux);
                }
                break;
            case "sbonus":
                aux = [...sbonus];
                newvalue = aux.find(c => c.prize === id);

                if (newvalue) {
                    newvalue.percent = parseFloat(value);
                    setSBonus(aux);
                }
                break;
        }
    }

    return (
        <div>
            <div className='pt-2 text-white container register'>
                <h1 className='text-center'>Editar sala {location.state.idroom}</h1>
                <form className='pt-2 text-white container register' name='assign' id="assign" onSubmit={OnSubmit}>
                    <div className='card border-success text-white bg-transparent mt-5'>
                        <h5 className="card-header border-success text-white">Modificar - {room.game}</h5>

                        <div className='d-flex justify-content-center  pt-3'>
                            <div className="form-inline">
                                <div className="mb-3">
                                    <label htmlFor="riskMaxBet" className="form-label">Maximo en apuesta {"(IA)"}</label>
                                    <input type="number" min={0} step={0.01} className="form-control text-white bg-dark border-success" id="riskMaxBet" name="RiskMaxBet" value={roomDetails.RiskMaxBet} onChange={ChangeSetup} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="bonusPosibility" className="form-label">Posibilidad de bonus</label>
                                    <input type="number" min={0} step={0.01} className="form-control text-white bg-dark border-success" id="bonusPosibility" name="bonusPosibility" value={roomDetails.bonusPosibility} onChange={ChangeSetup} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="bonusRopePosibility" className="form-label">Posibilidad cuerda Bonus</label>
                                    <input type="number" min={0} step={0.01} className="form-control text-white bg-dark border-success" id="bonusRopePosibility" name="bonusRopePosibility" value={roomDetails.bonusRopePosibility} onChange={ChangeSetup} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="minBetToHardHat" className="form-label">Minimo en apuesta para Casco</label>
                                    <input type="number" min={0} className="form-control text-white bg-dark border-success" id="minBetToHardHat" name="minBetToHardHat" value={roomDetails.minBetToHardHat} onChange={ChangeSetup} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="sbonusPosibility" className="form-label">Posibilidad Super Bonus</label>
                                    <input type="number" min={0} step={0.01} className="form-control text-white bg-dark border-success" id="sbonusPosibility" name="sbonusPosibility" value={roomDetails.sbonusPosibility} onChange={ChangeSetup} />
                                </div>
                                <div className="table-responsive">
                                    <label htmlFor="sbonusPosibility" className="form-label">Lista de simbolos</label>
                                    <table className="table table-dark table-striped text-center">
                                        <thead>
                                            <tr >
                                                <th>Codigo</th>
                                                <th>Icono</th>
                                                <th>Porcentaje</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                allSymbols ? (

                                                    allSymbols.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{item.id}</td>
                                                            <td>{symbols[item.id]}</td>
                                                            <td> <input type="number" min={0} step={0.01} className="form-control text-white bg-dark border-success" value={item.percent} onChange={e => ChangeTable(item.id, e.target.value, "symbols")} /></td>

                                                        </tr>

                                                    ))
                                                ) : null
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="table-responsive">
                                    <label htmlFor="sbonusPosibility" className="form-label">Lista de cartas</label>
                                    <table className="table table-dark table-striped text-center">
                                        <thead>
                                            <tr >
                                                <th>Codigo</th>
                                                <th>Icono</th>
                                                <th>Porcentaje</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                allCards ? (

                                                    allCards.map((item) => (
                                                        <tr  key={item.value}>
                                                            <td>{item.value}</td>
                                                            <td>{cards[item.value]}</td>
                                                            <td> <input type="number" min={0} step={0.01} className="form-control text-white bg-dark border-success" value={item.percent} onChange={e => ChangeTable(item.value, e.target.value, "cards")}/></td>

                                                        </tr>

                                                    ))
                                                ) : null
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="table-responsive">
                                    <label htmlFor="sbonusPosibility" className="form-label">Configuracion de premios bonus</label>
                                    <table className="table table-dark table-striped text-center">
                                        <thead>
                                            <tr >
                                                <th>P. minimo</th>
                                                <th>P. maximo</th>
                                                <th>Porcentaje</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                bonus ? (

                                                    bonus.map((item) => (
                                                        <tr  key={item.minPrize}>
                                                            <td>{item.minPrize}</td>
                                                            <td>{item.maxPrize}</td>
                                                            <td> <input type="number" min={0} step={0.01} className="form-control text-white bg-dark border-success" value={item.percent} onChange={e => ChangeTable(item.minPrize, e.target.value, "bonus")}/></td>

                                                        </tr>

                                                    ))
                                                ) : null
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="table-responsive">
                                    <label htmlFor="sbonusPosibility" className="form-label">Configuracion de premios super bonus</label>
                                    <table className="table table-dark table-striped text-center">
                                        <thead>
                                            <tr >
                                                <th>Premio</th>
                                                <th>Porcentaje</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                sbonus ? (
                                                    sbonus.map((item) => (
                                                        <tr key={item.prize}>
                                                            <td>{item.prize}</td>
                                                            <td> <input type="number" min={0} step={0.01} className="form-control text-white bg-dark border-success" value={item.percent} onChange={e => ChangeTable(item.prize, e.target.value, "sbonus")} /></td>

                                                        </tr>

                                                    ))
                                                ) : null
                                            }
                                        </tbody>
                                    </table>
                                </div>
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
            </div>
            <Modal className="container-fluid" backdrop="static" show={showConfirmDialog} onHide={() => setShowConfirmDialog(false)} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmacion 🤔</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <p>Esta seguro que desea actualizar la sala?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button ref={refBtnConfirm} className="btn btn-success" onClick={ConfirmSubmit}>Confirmar</button>
                </Modal.Footer>
            </Modal>
        </div>

    );
};

export default EditGame;