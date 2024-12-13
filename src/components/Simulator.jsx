import React, {useEffect, useRef, useState} from 'react';
import {Modal, ProgressBar, Tab, Table, Tabs} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import {GetRooms} from "./APIExtras";
import {RoomById} from "./Game";
import {Simulate} from "./utils/Simulator";
import * as XLSX from 'xlsx';

export const Simulator = () => {
    const initialValues = {
        "simulations": 10,
        "credits": 0.0,
        "lines": 1,
        "idroom": 1,
        "bet": 0.1,
        "risk": false,
    };
    const [key, setKey] = useState('general');
    const [currentProgress, setCurrentProgress] = useState(100);
    const navigate = useNavigate();
    const form = useRef(null);
    const [game, setGame] = useState(initialValues);
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState(false);
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100;

    useEffect(() => {
        (async () => {
            const cookies = new Cookies();
            if (!cookies.get("userdata") || cookies.get("userdata").role !== 1)
                navigate('/');

            const values = await GetRooms();
            setRooms(values);
        })();
    }, []);

    function OnChangeEvent(e) {
        setGame({...game, [e.target.name]: e.target.value});
    }

    async function OnSubmit(e) {
        e.preventDefault();
        setTitle("Simulando.. ⏳");
        setCurrentProgress(100);
        setIsLoading(true);
        const roomSetup = await RoomById(game.idroom);

        const simulation = Simulate(game, roomSetup.setup);
        setResults(simulation);
        setIsLoading(false);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedResults = results.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    async function ExportToExcel() {
        setTitle("Preparando para descargar.. ⏳");
        setIsLoading(true);

        const chunkArray = (array, chunkSize) =>
            Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, i) =>
                array.slice(i * chunkSize, i * chunkSize + chunkSize)
            );

        // Dividir los datos en chunks
        setTitle("Dividiendo datos en partes.. 🔄");
        const chunks = chunkArray(results, 100000);
        const workbook = XLSX.utils.book_new();

        // Generar hojas de cálculo por chunk de forma asíncrona
        for (let index = 0; index < chunks.length; index++) {
            setTitle(`Procesando ${index + 1}/${chunks.length} ⏳`);
            setCurrentProgress(Math.round((index + 1) / chunks.length * 100));
            await new Promise((resolve) => setTimeout(resolve, 100)); // Pausa breve para actualizar la UI
            const worksheet = XLSX.utils.json_to_sheet(chunks[index]);
            XLSX.utils.book_append_sheet(workbook, worksheet, `Lote ${index + 1}`);
        }

        // Guardar el archivo XLSX
        setTitle("Guardando archivo... 💾");
        await new Promise((resolve) => {
            setTimeout(() => {
                XLSX.writeFile(workbook, `simulaciones_${game.simulations}_sala_${game.idroom}.xlsx`);
                resolve();
            }, 100); // Simula un breve retraso para guardar
        });

        // Finalizar el proceso
        setIsLoading(false);
        setTitle("Archivo descargado exitosamente ✅");
    }

    return (
        <>

            <div className='pt-2 text-white container register'>
                <h1 className='text-center mt-2'>Simulador</h1>
                <Tabs id="controlled-tab-example"
                      activeKey={key}
                      onSelect={(k) => setKey(k)}
                      className="border-0 mt-3">
                    <Tab eventKey="general" title="Crazy monkey"
                         tabClassName={key === "general" ? "bg-success text-white border-success" : "bg-transparent text-white"}
                         className=' card border-success text-white bg-transparent'
                    >
                        <form ref={form} onSubmit={OnSubmit}>

                            <div className='flex-column justify-content-center p-3'>
                                <h5 className="card-header border-success text-white pt-4">Ingresar informacion</h5>
                                <div className="justify-content-center  pt-3">
                                    <label htmlFor="room">Sala</label>
                                    <select className="form-select bg-dark border-success text-white"
                                            id="idroom"
                                            name='idroom' onChange={OnChangeEvent} required>
                                        {rooms.map(item => (
                                            <option key={item.id}>{item.id}</option>))}
                                    </select>
                                </div>
                                <div className="justify-content-center pt-3">
                                    <label htmlFor="simulations">Simulaciones</label>
                                    <input type="number" className="form-control bg-dark border-success text-white"
                                           id="simulations"
                                           value={game.simulations} required name='simulations'
                                           onChange={OnChangeEvent}
                                           min={10}
                                           max={1000000}
                                    />
                                </div>

                                <div className="justify-content-center  pt-3">
                                    <label htmlFor="credits">Creditos</label>
                                    <input type="number" className="form-control bg-dark border-success text-white"
                                           id="credits"
                                           step="0.01"
                                           min={0}
                                           value={game.credits} required name='credits'
                                           onChange={OnChangeEvent}/>
                                </div>

                                <div className="justify-content-center  pt-3">
                                    <label htmlFor="lines">Lineas</label>
                                    <select className="form-select bg-dark border-success text-white"
                                            id="lines"
                                            value={game.lines} name='lines' onChange={OnChangeEvent} required>
                                        {[1, 3, 5, 7, 9].map(item => (
                                            <option key={item} value={item}>{item}</option>))}
                                    </select>
                                </div>

                                <div className="justify-content-center  pt-3">
                                    <label htmlFor="bet">Apuesta</label>
                                    <select className="form-select bg-dark border-success text-white"
                                            id="bet"
                                            value={game.bet} name='bet' onChange={OnChangeEvent} required>
                                        {[0.1, 0.5, 1, 2, 3].map(item => (
                                            <option key={item} value={item}>{item}</option>))}
                                    </select>
                                </div>
                                <div className="justify-content-center pt-3">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch"
                                               checked={game.risk}
                                               id="flexSwitchCheckDefault"
                                               onChange={(e) => setGame({...game, risk: e.target.checked})}/>
                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Doblar
                                            siempre</label>
                                    </div>
                                </div>

                                <h5 className="card-header border-success text-white pt-4"></h5>


                                <div className='text-center mt-3 mb-4'>
                                    <div className="form-group ">

                                        <div className='d-flex flex-column container w-75'>
                                            <button className="btn btn-success mt-3" type="submit">Simular</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </form>


                    </Tab>


                </Tabs>
                <Modal size="sm" backdrop="static" show={isLoading} centered={true}>
                    <Modal.Header>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <ProgressBar variant="info" animated striped progress={100} now={currentProgress}/>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

            </div>
            {
                results.length > 0 &&
                <div className='container text-white p-5'>
                    <div className="table-responsive">
                        <div className="d-flex justify-content-between mt-3 mb-4">
                            <h2 className="mb-4">Resultados</h2>
                            <div className='d-flex flex-column w-25'>
                                <button className="btn btn-info mt-3" onClick={ExportToExcel}>Exportar a excel</button>
                            </div>

                        </div>
                        <Table striped hover variant="dark" className="text-center">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Lineas</th>
                                <th>Apuesta</th>
                                <th>Apuesta Total</th>
                                <th>Creditos</th>
                                <th style={{minWidth: "200px"}}>Detalles</th>
                                <th>Premio principal</th>
                                <th>Carta In</th>
                                <th>Carta Out</th>
                                <th>Bonus</th>
                                <th>S. Bonus</th>
                                <th>Premio total</th>
                                <th>Acumulado</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginatedResults.map((item) => (
                                <tr key={item.spin}>
                                    <td>{item.spin}</td>
                                    <td>{item.lines}</td>
                                    <td>{item.bet}</td>
                                    <td>{item.totalBet}</td>
                                    <td>{item.credits > 0 ? item.credits.toFixed(2) : item.credits}</td>
                                    <td>
                                        {item.details}
                                        {/*<table>*/}
                                        {/*    <tbody>*/}
                                        {/*    {*/}
                                        {/*        item.details.map(d => (*/}
                                        {/*            <tr>*/}
                                        {/*                <td>{d.description} </td>*/}
                                        {/*                <td className="text-warning">| {d.prize}</td>*/}
                                        {/*            </tr>*/}
                                        {/*        ))*/}
                                        {/*    }*/}
                                        {/*    </tbody>*/}
                                        {/*</table>*/}
                                    </td>
                                    <td className={item.mainPrize > 0 ? "text-success fw-bold" : "text-secondary"}>{item.mainPrize.toFixed(2)}</td>
                                    <td className="text-danger">{item.card_in?.toFixed(2)}</td>
                                    <td className="text-success">{item.card_out?.toFixed(2)}</td>
                                    <td className="text-warning">{item.bonus?.toFixed(2)}</td>
                                    <td className="text-warning fw-bold">{item.sbonus > 0 ? item.sbonus?.toFixed(2) : ""}</td>
                                    <td className={item.totalEarn > 0 ? "text-info" : "text-secondary"}>{item.totalEarn.toFixed(2)}</td>
                                    <td className="text-success fw-bold">{item.accumulated.toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        {Array.from({length: Math.ceil(results.length / itemsPerPage)}, (_, i) => (
                            <button
                                key={i}
                                className={`btn mx-1 ${i + 1 === currentPage ? 'btn-success' : 'btn-secondary'}`}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>

            }

        </>
    );
};
