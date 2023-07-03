import React, { useEffect, useRef, useState } from 'react'
import Crazy from './imgs/crazy.png'
import King from './imgs/king.png'
import Cookies from 'universal-cookie'
import { ShowDialog } from './Dialogs'
import { ConnectRoom, GetRoom } from './Game'


export const GameItem = props => {
    const initialMessage = {title: "Sala ocupada.. 😥", body: "Actualmente esta sala se encuentra ocupada por otro usuario, favor intentalo mas tarde."}
    const [room, setRoom] = useState(props.item);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(initialMessage)
    
    const Handler = () =>{
        setShow(!show);
    }
    const card = useRef(null);
    const Images = {
        'CRMK':Crazy,
        'KING':King
    }

    const url = {
        'CRMK':"https://royalonline.cloud/crazy",
        'KING':"https://royalonline.cloud/king"
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
        const cookie = new Cookies();
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
                window.open(url[room.idgame], "_blank");
            } else if (res === 202) {
                setMessage({title: "Actualmente en partida.. 😱", body: "En estos instantes registramos una partida activa para tu cuenta, favor finalizar esa sesion antes de continuar."});
                Handler();
            }
        } else {
            props.handler();
        }
    }

    return (
        <div className="col-4 flex-fill">
            <div ref={card} className="image-container mt-2 bg-success">
                <img src={Images[room.idgame]} className='image' onClick={Selectgame} alt='logo'/>
                <ShowDialog show={show} handler={Handler} title={message.title} message={message.body}/>
            </div>
        </div>
    );
}
