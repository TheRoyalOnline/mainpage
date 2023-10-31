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
    useEffect(() => {
        Starting();
    }, [allSymbols]);

    async function Starting() {
        const cookie = new Cookies();
        if (cookie.get("userdata") === undefined)
            navigate('/');

        const setup = await RoomById(location.state.idroom)
        setRoom(setup);
        setRoomDetails(JSON.parse(setup.setup))
        setAllSymbols(roomDetails.items)
    }


    function OnChange(e) {
        const data = games.find(i => i.idgame === e.target.value);
        setGame(data);
    }


    async function Assign(e) {
    }

    function OnSubmit(e) {
        e.preventDefault();
        setShowConfirmDialog(true);
    }

    async function ConfirmSubmit(e) {
        refBtnConfirm.current.disabled = true;
        if (confirm) return;
        setConfirm(true);

        var res = 0;
        res = await GamesSetup(game);

        Starting();
        refBtnConfirm.current.disabled = false;
        setConfirm(false);
        CallModal();
    }

    function ChangeSetup(e) {
        setRoomDetails({ ...roomDetails, [e.target.name]: e.target.value });
    }

    function CallModal() {
        setShowConfirmDialog(!showConfirmDialog);
    }

    return (
        <div>
            <div className='pt-2 text-white container register'>
                <h1 className='text-center'>Editar sala {location.state.idroom}</h1>
                <form className='pt-2 text-white container register' name='assign' id="assign" onSubmit={OnSubmit}>
                    <div className='card border-success text-white bg-transparent mt-5'>
                        <h5 className="card-header border-success text-white">Modificar</h5>

                        <div className='d-flex justify-content-center  pt-3'>
                            <div className="form-inline">
                                <form>
                                    <div className="mb-3">
                                        <label for="riskMaxBet" className="form-label">Maximo en apuesta {"(IA)"}</label>
                                        <input type="number" min={0} step={0.01} className="form-control text-white bg-dark border-success" id="riskMaxBet" name="RiskMaxBet" value={roomDetails.RiskMaxBet} onChange={ChangeSetup} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="bonusPosibility" className="form-label">Posibilidad de bonus</label>
                                        <input type="number" min={0} step={0.01} className="form-control text-white bg-dark border-success" id="bonusPosibility" name="bonusPosibility" value={roomDetails.bonusPosibility} onChange={ChangeSetup} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="bonusRopePosibility" className="form-label">Posibilidad cuerda Bonus</label>
                                        <input type="number" min={0} step={0.01} className="form-control text-white bg-dark border-success" id="bonusRopePosibility" name="bonusRopePosibility" value={roomDetails.bonusRopePosibility} onChange={ChangeSetup} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="minBetToHardHat" className="form-label">Minimo en apuesta para Casco</label>
                                        <input type="number" min={0} className="form-control text-white bg-dark border-success" id="minBetToHardHat" name="minBetToHardHat" value={roomDetails.minBetToHardHat} onChange={ChangeSetup} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="sbonusPosibility" className="form-label">Posibilidad Super Bonus</label>
                                        <input type="number" min={0} step={0.01} className="form-control text-white bg-dark border-success" id="sbonusPosibility" name="sbonusPosibility" value={roomDetails.sbonusPosibility} onChange={ChangeSetup} />
                                    </div>
                                    <div className="table-responsive">
                                        <label for="sbonusPosibility" className="form-label">Lista de simbolos</label>
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
                                                            <tr>
                                                                <td>{item.id}</td>
                                                                <td>{symbols[item.id]}</td>
                                                                <td> <input type="number" min={0} step={0.01} className="form-control text-white bg-dark border-success" id="bonusRopePosibility" name="bonusRopePosibility" value={item.percent} onChange={ChangeSetup} /></td>

                                                            </tr>

                                                        ))
                                                    ):null
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </form>
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
                    <p>Esta seguro que desea actualizar el juego?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button ref={refBtnConfirm} className="btn btn-success" onClick={ConfirmSubmit}>Confirmar</button>
                </Modal.Footer>
            </Modal>
        </div>

    );
};

export default EditGame;