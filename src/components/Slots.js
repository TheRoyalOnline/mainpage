import React, { useEffect, useState } from "react";
import { GameItem } from "./GameItem";
import { GetRooms } from "./APIExtras";
import { Iframe } from "./Iframe";

export const MainPage = (props) => {
    const [rooms, setRooms] = useState([]);
    const [showGame, setShowGame] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {

        (async () => {
            const values = await GetRooms();
            setRooms(values);
        })();

    }, []);


    const ShowGame = () => {
        setShowGame(!showGame);
    }

    return (

        <div className="container">
            <div className="row d-flex">
                {
                    rooms.map(room => (
                        <GameItem item={room} key={room.id} handler={props.handler} showGame={ShowGame} setURL={ u => setUrl(u)}/>
                    ))
                }
            </div>
            <Iframe url={url} show={showGame} showGame={ShowGame}/>
        </div>

    );
};

export default MainPage;