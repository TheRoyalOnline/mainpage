import React, { useEffect, useState } from "react";
import { GameItem } from "./GameItem";
import { GetRooms } from "./APIExtras";

export const MainPage = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(()=>{
        async function LoadData(){
            const values = await GetRooms();
            setRooms(values);
        }
        LoadData();
    }, []);

    return (

        <div className="container">
            <div className="row d-flex">
                {
                    rooms.map(room =>(
                        <GameItem item={room} key={room.id}/>                        
                    ))
                }
            </div>
        </div>

    );
};

export default MainPage;