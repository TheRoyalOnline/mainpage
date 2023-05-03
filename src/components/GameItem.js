import React, { Component, useEffect, useRef } from 'react'
import Logo from './imgs/logo.png'

export const GameItem = props => {
    const card = useRef(null);

    useEffect(
        () => {
            if(props.item.occupied)
            {
                card.current.classList.add('border-danger');
            }else{
                card.current.classList.add('border-success');
            }
        }
    );

    function Selectgame()
    {
        console.log("game");
    }
    
    return (
        <div className="col-4 flex-fill">
            <div ref={card} className="card card-body bg-black mt-2 extra-border">
                <h3 className="card-title text-white">{props.item.idgame}</h3>
                <img src={Logo} onClick={Selectgame}/>
            </div>
        </div>
    );
}
