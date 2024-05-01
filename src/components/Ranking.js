import {React, useEffect, useState} from "react";
import {GetRanking} from "./Game";
import {Collapse, Button} from 'react-bootstrap';
import banana from "../components/imgs/icons/banana.png"
import mariposa from "../components/imgs/icons/mariposa.png"
import leon from "../components/imgs/icons/leon.png"
import mono from "../components/imgs/icons/mono.png"
import Cookies from "universal-cookie";

const Ranking = () => {
    const symbols = {
        "mariposa": "🦋",
        "banana": "🍌",
        "serpiente": "🐍",
        "ancla": "⚓",
        "piña": "🍍",
        "leon": "🦁",
        "joker": "💀",
        "crazy": "⭐",
        "mono": "🐒🐒🐒"
    }

    const cards = {
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
        "10": "10",
        "11": "J",
        "12": "Q",
        "13": "K",
        "14": "A",
        "15": "🃏"
    }

    const [list, setList] = useState([]);
    const [expand, setExpand] = useState('⬇️ Ranking');
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        GetData();
    }, []);

    async function GetData() {
        const cookie = new Cookies();
        if(cookie.get("userdata") !== undefined){
            setShow(true);
        }
        else
            return;

        const rank = await GetRanking();
        setList(rank);
    }

    function SetCombinations(winCombinations, card, bonus, sbonus) {
        let comb = ""
        winCombinations.forEach((element, index) => {
            const amount = element.split(" ")[0];
            const sym = element.split(" ")[1];
            for (let i = 0; i < amount; i++) {
                comb += symbols[sym];
            }

            comb += index !== winCombinations.length - 1 ? " + " : "";
        })
        const b = bonus > 0 ? `${symbols['mono']} B. ${bonus}` : "";
        const sb = sbonus > 0 ? ` | S. ${sbonus} +` : "";

        let c = ""
        card.forEach((element, index) => {
            c += index === 0 ? " + " : "";
            c += `${cards[element.dealer]} ${cards[element.pick]}`
            c += index === card.length - 1 && card.length > 1 ? " + " : "";
        })

        return b + sb + comb + c;
    }

    function OnOpen(e){
        setOpen(!open);
        setExpand(open ? '⬇️ Ranking':'⬆️')
    }

    return (

        show ? (
            <div className="text-center pb-2">
                <button className="btn btn-purple text-white" onClick={OnOpen}>{expand}</button>
                <Collapse in={open}>
                    <div className='text-white container pt-2'>
                        <div className='card border-success bg-purple'>

                            <h5 className="card-header border-success text-white bg-purple-2">Ranking</h5>

                            <div className='flex-column justify-content-center'>
                                <div className="table-responsive">
                                    <table className="table table-dark table-striped text-center">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Usuario</th>
                                            <th>Apuesta</th>
                                            <th></th>
                                            <th>Premio</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            list.map((item, index) => (
                                                <tr>
                                                    <td className={index === 0 ? "text-success fw-bold" : ""}>{index + 1}</td>
                                                    <td className={index === 0 ? "text-success fw-bold" : ""}>{item.username}</td>
                                                    <td className={index === 0 ? "text-success fw-bold" : ""}>{item.details.result.bet}</td>
                                                    <td className={index === 0 ? "text-success fw-bold" : ""}>{SetCombinations(item.details.result.winCombination, item.details.result.cards, item.details.result.bonusEarn, item.details.result.sbonusEarn)}</td>
                                                    <td className={index === 0 ? "text-success fw-bold" : ""}>{parseInt(item.total * 1000).toLocaleString()} Gs</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </Collapse>
            </div>

        ) : null

    );
}

export default Ranking;