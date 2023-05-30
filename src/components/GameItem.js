import React, { useEffect, useRef, useState } from 'react'
import Crazy from './imgs/crazy.png'
import King from './imgs/king.png'
import Cookies from 'universal-cookie'
import { ShowDialog } from './Dialogs'

export const GameItem = props => {
    const [occupied, setOccupied] = useState(false);
    const [show, setShow] = useState(false);

    const Handler = () =>{
        setShow(!show);
    }
    const card = useRef(null);
    const Images = {
        'CRMK':Crazy,
        'KING':King
    }

    useEffect(
        () => {
            if(occupied)
            {
                card.current.classList.add('border-danger');
                card.current.classList.remove('border-success');
            }else{
                card.current.classList.remove('border-danger');
                card.current.classList.add('border-success');
            }
        }
    ,[occupied]);

    function Selectgame() {
        const cookie = new Cookies();
        if(occupied){
            Handler();
            return;
        }
        if (cookie.get('isLogged'))
        {
            window.open("https://royalonline.cloud/crazy", "_blank");
            setOccupied(true);
        }else{
            props.handler();
        }
    }

    return (
        <div className="col-4 flex-fill">
            <div ref={card} className="card card-body bg-black mt-2 extra-border">
                {/* <h3 className="card-title text-white">{props.item.idgame}</h3> */}
                <img src={Images[props.item.idgame]} className='image' onClick={Selectgame} alt='logo'/>
                <ShowDialog show={show} handler={Handler} title={"Sala ocupada.. 😥"} message={"Actualmente esta sala se encuentra ocupada por otro usuario, favor intentalo mas tarde. "}/>
            </div>
        </div>
    );
}
