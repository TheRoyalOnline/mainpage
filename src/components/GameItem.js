import React, { useEffect, useRef } from 'react'
import Logo from './imgs/logo.png'
import Crazy from './imgs/crazy.png'
import King from './imgs/king.png'
import Cookies from 'universal-cookie'

export const GameItem = props => {
    const card = useRef(null);
    const Images = {
        'CRMK':Crazy,
        'KING':King
    }

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

    function Selectgame() {
        const cookie = new Cookies();
        if (cookie.get('isLogged'))
            window.open("https://royalonline.cloud/crazy", "_blank");
    }

    return (
        <div className="col-4 flex-fill">
            <div ref={card} className="card card-body bg-black mt-2 extra-border">
                {/* <h3 className="card-title text-white">{props.item.idgame}</h3> */}
                <img ref={card} src={Images[props.item.idgame]} className='image' onClick={Selectgame} alt='logo'/>
            </div>
        </div>
    );
}
