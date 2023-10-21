import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Modal } from "react-bootstrap";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { GamesList, GamesSetup } from "./Game";

export const EditGame = () => {
    const [confirm, setConfirm] = useState(false);
    const [errMessage2, setErrMessage2] = useState('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [games, setGames] = useState([]);
    const [game, setGame] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const refBtnConfirm = useRef(null);
    const refSelectGame = useRef(null);

    useEffect(() => {
        Starting();
    }, []);

    async function Starting() {
        const cookie = new Cookies();
        if (cookie.get("userdata") === undefined)
            navigate('/');
        const list = await GamesList();
        if (list.lenght <= 0)
            navigate('/');

        setGames(list);
        setGame(list[0]);
        
        refSelectGame.current.selectedIndex = 0;
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

    function ChangeSetup(e){
        setGame({ ...game, setup: e.target.value});
    }

    function CallModal() {
        setShowConfirmDialog(!showConfirmDialog);
    }

    return (
        <div>
            <div className='pt-2 text-white container register'>
                <h1 className='text-center'>Editar juegos</h1>
                <form className='pt-2 text-white container register' name='assign' id="assign" onSubmit={OnSubmit}>
                    <div className='card border-success text-white bg-transparent mt-5'>
                        <h5 className="card-header border-success text-white">Modificar</h5>

                        <div className='d-flex justify-content-center p-3'>
                            <div className="justify-content-center pt-3">
                                <label htmlFor="idgame">Lista de juegos</label>
                                <select ref={refSelectGame} className="form-select bg-dark border-success text-white" id="idgame" value={games.idgame} onChange={OnChange}>
                                    {
                                        games.map((item) =>
                                        (
                                            <option key={item.idgame} value={item.idgame}>{item.name}</option>
                                        ))
                                    }
                                </select>

                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div className="form-inline">
                                <label htmlFor="label1 ">JSON:</label>
                                <textarea name="setup" value={game.setup} className="form-control bg-dark border-success text-white" cols={60} onChange={ChangeSetup} />
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