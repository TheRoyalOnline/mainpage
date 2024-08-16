import {React, useEffect, useState} from "react";
import {GetRanking} from "./Game";
import {Collapse} from 'react-bootstrap';
import Cookies from "universal-cookie";
import Timer from "./Timer";
import {GetGlobal} from "./APIExtras";

const Ranking = () => {
    const symbols = {
        "mariposa": require("../components/imgs/icons/mariposa.png"),
        "banana": require("../components/imgs/icons/banana.png"),
        "serpiente": require("../components/imgs/icons/serpiente.png"),
        "ancla": require("../components/imgs/icons/yunke.png"),
        "piña": require("../components/imgs/icons/piña.png"),
        "leon": require("../components/imgs/icons/leon.png"),
        "joker": require("../components/imgs/icons/joker.png"),
        "crazy": require("../components/imgs/icons/crazy.png"),
        "mono": require("../components/imgs/icons/mono.png"),
        "box": require("../components/imgs/icons/box.png")
    }

    const cards = {
        "2": require("../components/imgs/cards/2.png"),
        "3": require("../components/imgs/cards/3.png"),
        "4": require("../components/imgs/cards/4.png"),
        "5": require("../components/imgs/cards/5.png"),
        "6": require("../components/imgs/cards/6.png"),
        "7": require("../components/imgs/cards/7.png"),
        "8": require("../components/imgs/cards/8.png"),
        "9": require("../components/imgs/cards/9.png"),
        "10":require("../components/imgs/cards/10.png"),
        "11":require("../components/imgs/cards/11.png"),
        "12":require("../components/imgs/cards/12.png"),
        "13":require("../components/imgs/cards/13.png"),
        "14":require("../components/imgs/cards/14.png"),
        "15":require("../components/imgs/cards/15.png")
    }

    const [list, setList] = useState([]);
    const [expand, setExpand] = useState('⬇️ Ranking');
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [rankingDate, setRankingDate] = useState(new Date());

    useEffect(() => {
        GetData();
    }, []);

    async function GetData() {
        const cookie = new Cookies();
        if (cookie.get("userdata") !== undefined) {
            setShow(true);
        } else
            return;

        const rank = await GetRanking();
        const d = await GetGlobal('ranking_date');


        setRankingDate(new Date(d));
        setList(rank);
    }

    function SetCombinations(winCombinations, card, bonus, sbonus) {
        let comb = []
        winCombinations.forEach((element, index) => {
            const amount = element.split(" ")[0];
            const sym = element.split(" ")[1];
            for (let i = 0; i < amount; i++)
                comb.push(<img src={symbols[sym]} width='25'/>);

            if(index < winCombinations.length - 1)
                comb.push(<>+</>)
        })

        const monkeys = [<img src={symbols['mono']} width='25'/>,<img src={symbols['mono']} width='25'/>,<img src={symbols['mono']} width='25'/>];
        const b = bonus > 0 ? ` ${bonus} ` : "";
        const sb = sbonus > 0 ? ` ${sbonus} ` : "";
        let c = []
        card.forEach((element, index) => {
            c.push(<img src={cards[element.dealer]} width='15'/>);
        })
        return(
            <>
                <div>{bonus > 0 ? monkeys : null} {b}{sbonus > 0 ?
                    <>| <img src={symbols['box']} width='23'/></> : null}{sb}{comb}<span>{c.length > 0 ? "+ " : ""}{c}</span></div>
            </>
        );
    }

    function OnOpen(e) {
        setOpen(!open);
        setExpand(open ? '⬇️ Ranking' : '⬆️')
    }

    return (

        show ? (
            <div className="text-center pb-2">
                <button className="btn btn-purple text-white" onClick={OnOpen}>{expand}</button>
                <Collapse in={open}>
                    <div className='text-white container pt-2'>
                        <div className='card border-success bg-purple'>

                            <h5 className="card-header border-success text-white bg-purple-2">Jackpot Ranking</h5>
                            <p className="card-header text-white bg-purple-2"><Timer targetDate={rankingDate}/></p>

                            <div className='flex-column justify-content-center'>
                                <div className="table-responsive">
                                    <table className="table table-dark table-striped text-center">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Usuario</th>
                                            <th>Apuesta</th>
                                            <th style={{ minWidth: '200px' }}></th>
                                            <th>Monto</th>
                                            <th className={"text-warning fw-bold"}>Premio</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            list.map((data, index) => (
                                                <tr key={index}>
                                                    <td className={index === 0 ? "text-warning fw-bold" : ""}>{index + 1}</td>
                                                    <td className={index === 0 ? "text-warning fw-bold" : ""}>{data.item.username}</td>
                                                    <td className={index === 0 ? "text-warning fw-bold" : ""}>{data.item.details.result.bet.toFixed(2)}</td>
                                                    <td className={index === 0 ? "text-warning fw-bold" : ""}>{SetCombinations(data.item.details.result.winCombination, data.item.details.result.cards, data.item.details.result.bonusEarn, data.item.details.result.sbonusEarn)}</td>
                                                    <td className={index === 0 ? "text-warning fw-bold" : ""}>Gs {parseInt(data.item.total * 1000).toLocaleString()}</td>
                                                    <td className={"text-warning fw-bold"}>Gs {parseInt(data.prize * 1000).toLocaleString()}</td>
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