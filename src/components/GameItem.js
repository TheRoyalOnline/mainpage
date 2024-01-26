import React, { useEffect, useRef, useState } from 'react'
import Crazy from './imgs/crazy.png'
import King from './imgs/king.png'
import Cookies from 'universal-cookie'
import { ShowDialog } from './Dialogs'
import { ConnectRoom, GetRoom, ForceDisconnectAdmin } from './Game'
import Iframe from './Iframe'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaSplotch } from 'react-icons/fa'
import { BiMath, BiEdit, BiXCircle } from 'react-icons/bi'
import { ForceDisconnect } from "./Game";
import {  GetUserCredits } from './API'


export const GameItem = props => {
    const cookie = new Cookies();
    const navigate = useNavigate();
    const initialMessage = { title: "Sala ocupada.. 😥", body: "Actualmente esta sala se encuentra ocupada por otro usuario, favor intentalo mas tarde." }
    const [room, setRoom] = useState(props.item);
    const [show, setShow] = useState(false);
    const [showGame, setShowGame] = useState(false);
    const [message, setMessage] = useState(initialMessage);
    const [fullURL, setFullURL] = useState('');
    const numberRef = useRef(null);
    const [credits, setCredits] = useState([]);

    const Handler = () => {
        setShow(!show);
    }
    const card = useRef(null);
    const Images = {
        'CRMK': Crazy,
        'KING': King
    }

    const methods = {
        'edit': v => {
            navigate("/Operations/Editgame", { state: { idroom: v } });
        },
        'stats': v => {
            navigate("/Operations/Statistics", { state: { idroom: v } });
        },
        'force': async v => {
            const res = await ForceDisconnectAdmin(v);
            if (res === 200)
                window.location.reload();
        }
    }

    const url = {
        'CRMK': "https://royalonline.cloud/crazy?token=",
        'KING': "https://royalonline.cloud/king?token="
    }

    useEffect(
        () => {
            if (room.iduser) {
                card.current.classList.add('bg-danger');
                card.current.classList.remove('bg-success');
                numberRef.current.classList.add('bg-danger');
                numberRef.current.classList.remove('bg-success');
                GetDetails();
            } else {
                card.current.classList.remove('bg-danger');
                card.current.classList.add('bg-success');
                numberRef.current.classList.remove('bg-danger');
                numberRef.current.classList.add('bg-success');
            }
        }
        , [room]);

    async function GetDetails(){
        const cre = await GetUserCredits(room.iduser);
        setCredits(cre);
    }

    async function Selectgame() {
        setMessage(initialMessage);
        if (cookie.get('userdata') !== undefined) {
            const r = await GetRoom(room.id);
            setRoom(r);
            
            if (r.iduser !== 0) {
                Handler();
                return;
            } else if (cookie.get('userdata').role === 1 || cookie.get('userdata').role === 5) {
                const res = await ConnectRoom(cookie.get('userdata').iduser, room.id);
                if (res === 200) {
                    setShowGame(true);
                    setRoom({ ...room, iduser: cookie.get('userdata').iduser });
                    AudioContext();
                    const fullURL = url[room.idgame] + cookie.get('userdata').token;
                    setFullURL(fullURL);


                } else if (res === 202) {
                    setMessage({ title: "Actualmente en partida.. 😱", body: "En estos instantes registramos una partida activa para tu cuenta, favor finalizar esa sesion antes de continuar." });
                    Handler();
                }

            } else {
                setMessage({ title: "Acceso restringido 🔒", body: "Tu rol no posee permisos para acceder a los slots." });
                Handler();
            }
        } else {
            props.handler();
        }
    }

    async function ExitGame() {
        const res = await ForceDisconnect();
        if (res === 200) {
            setRoom({ ...room, iduser: 0 });
            setShowGame(false);
            setFullURL('');
        }
    }

    function OnClick(e) {
        methods[e.target.name](e.target.value);
    }

    let audioContext = null;

    function AudioContext() {
        // Verificar si ya hay un contexto de audio creado
        if (!audioContext) {
            // Crear un nuevo contexto de audio
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            // Tu lógica adicional para la manipulación del contexto de audio
        }

        // Intentar reanudar el contexto de audio (esto es necesario en algunos navegadores)
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    }
    return (
        <>
            <div className="col-4 flex-fill">
                <div ref={card} className="image-container mt-2 bg-success relative-position-card">
                    <div className='d-flex justify-content-between align-items-center'>
                        {
                            cookie.get("userdata") !== undefined ? (
                                cookie.get("userdata").role === 1 ? (
                                    <div>
                                        <button className='btn btn-transparent text-border' value={room.id} title='Editar' name='edit' onClick={OnClick} >✏️</button>
                                        <button className='btn btn-transparent text-border' value={room.id} title='Estadisticas' name='stats' onClick={OnClick}>💰</button>                                        
                                        {
                                            room.iduser !== 0 ? (<React.Fragment>
                                                <button className='btn btn-transparent text-border' value={room.id} title='Forzar' name='force' onClick={OnClick}>❌</button>
                                                <label className='text-border'><b>{room.username} - {credits.credits}c </b></label>
                                            </React.Fragment>) : null
                                        }

                                    </div>
                                ) : null

                            ) : null
                        }
                    </div>
                    <img src={Images[room.idgame]} className='image' onClick={Selectgame} alt='logo' />
                    <div className="green-box bg-success" ref={numberRef}>{room.id}</div>
                </div>
            </div>

            <ShowDialog show={show} handler={Handler} title={message.title} message={message.body} />
            <Iframe show={showGame} url={fullURL} showGame={ExitGame} title={"CRAZY MONKEY"} />
        </>
    );
}
