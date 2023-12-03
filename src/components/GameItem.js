import React, { useEffect, useRef, useState } from 'react'
import Crazy from './imgs/crazy.png'
import King from './imgs/king.png'
import Cookies from 'universal-cookie'
import { ShowDialog } from './Dialogs'
import { ConnectRoom, GetRoom, ForceDisconnectAdmin } from './Game'
import Iframe from './Iframe'
import { useNavigate } from 'react-router-dom'
import {FaEdit, FaSplotch} from 'react-icons/fa'
import {BiMath} from 'react-icons/bi'


export const GameItem = props => {
    const cookie = new Cookies();
    const navigate = useNavigate();
    const initialMessage = { title: "Sala ocupada.. 😥", body: "Actualmente esta sala se encuentra ocupada por otro usuario, favor intentalo mas tarde." }
    const [room, setRoom] = useState(props.item);
    const [show, setShow] = useState(false);
    const [showGame, setShowGame] = useState(false);
    const [message, setMessage] = useState(initialMessage)

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
            if(res === 200)
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
            } else {
                card.current.classList.remove('bg-danger');
                card.current.classList.add('bg-success');
            }
        }
        , [room]);

    async function Selectgame() {
        setMessage(initialMessage);
        if (cookie.get('userdata') !== undefined) {
            const r = await GetRoom(room.id);
            setRoom(r);
            if (r.iduser !== 0) {
                Handler();
                return;
            }
            const res = await ConnectRoom(cookie.get('userdata').iduser, room.id);
            if (res === 200) {
                setRoom({ ...room, iduser: cookie.get('userdata').iduser });

                const fullURL = url[room.idgame] + cookie.get('userdata').token;
                //props.setURL(fullURL);
                //props.showGame();
                window.open(fullURL, "_blank");
            } else if (res === 202) {
                setMessage({ title: "Actualmente en partida.. 😱", body: "En estos instantes registramos una partida activa para tu cuenta, favor finalizar esa sesion antes de continuar." });
                Handler();
            }
        } else {
            props.handler();
        }
    }

    function OnClick(e) {
        methods[e.target.name](e.target.value);
    }

    return (
        <div className="col-4 flex-fill">
            <div ref={card} className="image-container mt-2 bg-success relative-position-card">
                <div className='d-flex justify-content-between align-items-center'>
                    {
                        cookie.get("userdata") !== undefined ? (
                            cookie.get("userdata").role === 1 ? (
                                <div>
                                    <button className='btn btn-transparent text-white'  value={room.id} title='Editar' name='edit' onClick={OnClick}>Editar</button>
                                    <button className='btn btn-transparent  text-white' value={room.id} title='Estadisticas' name='stats' onClick={OnClick}>Estadisticas</button>
                                    {
                                        room.iduser !== 0 ? (<button className='btn btn-transparent  text-white' value={room.id} title='Forzar' name='force' onClick={OnClick}>❎</button>) : null
                                    }
                                    
                                </div>
                            ) : null

                        ) : null
                    }
                </div>
                <img src={Images[room.idgame]} className='image' onClick={Selectgame} alt='logo' />
                <ShowDialog show={show} handler={Handler} title={message.title} message={message.body} />
                <div className="green-box bg-success">{room.id}</div> 
            </div>
        </div>
    );
}
