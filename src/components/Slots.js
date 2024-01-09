import React, { useEffect, useRef, useState } from "react";
import { GameItem } from "./GameItem";
import { GetRooms } from "./APIExtras";
import { Iframe } from "./Iframe";
import { GetUserCredits, GetUserDetails } from "./API";

export const MainPage = (props) => {
    const [rooms, setRooms] = useState([]);
    const [showGame, setShowGame] = useState(false);
    const [url, setUrl] = useState('');
    const refIframe = useRef(null);

    useEffect(() => {

        (async () => {
            const values = await GetRooms();
            setRooms(values);
        })();

    }, []);


    const ShowGame = () => {
        refIframe.current.Show();
    }

    return (
        <>
            <div className="container">
                <div className="row d-flex">
                    {
                        rooms.map(room => (
                            
                            <GameItem item={room} key={room.id} handler={props.handler} showGame={ShowGame} setURL={u => setUrl(u)} />
                        ))
                    }
                </div>
            </div>
            {/* <Iframe url={url} show={ShowGame} ref={refIframe}/> */}
        </>

    );
};

export default MainPage;