import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UsersList} from "./API";
import Cookies from "universal-cookie";
import {DateConnection} from "./utils/DateConnection";
import {Spinner} from "react-bootstrap";

export const UserList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const rol = {
        1: "Administrador",
        2: "Caja",
        3: "Operador",
        4: "Vendedor",
        5: "Cliente"
    }

    const [canEdit, setCanEdit] = useState(false);
    const [sortConfig, setSortConfig] = useState({key: null, direction: 'asc'});
    const roles = [1, 4];
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {

        Start();
    }, []);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({key, direction});

        const sortedData = [...users].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setUsers(sortedData);
    };

    function ShowMovements(iduser) {
        const props = {iduser: iduser}
        navigate('/Operations/Movements', {state: props})
    }

    function ShowStatistics(iduser, username) {
        const props = {iduser: iduser, username: username}
        navigate('/Operations/Statisticsuser', {state: props})
    }

    async function Start() {
        const cookie = new Cookies();
        setIsLoading(true);
        const role = cookie.get("userdata").role;
        if (cookie.get("userdata") === undefined || !roles.includes(role))
            navigate('/Operations');
        const data = await UsersList();
        setUsers(data);
        setCanEdit(role === 1);
        setIsLoading(false);
    }

    function Edit(item) {
        navigate('/Operations/Editusers', {state: {user: item}})
    }

    function Commissions(item) {
        navigate('/Operations/Commissions', {state: {username: item.username, iduser: item.iduser}});
    }

    if (isLoading) {
        return (<div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <Spinner className="spinner-grow text-success" animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
        </div>)
    }

    return (

        <div className='pt-2 text-white container'>
            <h1 className='text-center '>Lista de usuarios</h1>
            <div className='card border-success text-white bg-transparent mt-5'>

                <h5 className="card-header border-success text-white pt-4">Todos</h5>
                <div className='flex-column justify-content-center p-3'>
                    <div className="table-responsive">
                        <table className="table table-dark table-striped text-center">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th onClick={() => handleSort('username')}
                                    style={{cursor: 'pointer'}}>Usuario {sortConfig.key === 'username' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                                <th onClick={() => handleSort('firstname')}
                                    style={{cursor: 'pointer'}}>Nombre {sortConfig.key === 'firstname' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                                <th onClick={() => handleSort('surname')}
                                    style={{cursor: 'pointer'}}>Apellido {sortConfig.key === 'surname' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                                <th onClick={() => handleSort('credits')}
                                    style={{cursor: 'pointer'}}>Creditos {sortConfig.key === 'credits' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                                <th onClick={() => handleSort('cash')}
                                    style={{cursor: 'pointer'}}>Efectivo {sortConfig.key === 'cash' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                                <th onClick={() => handleSort('email')}
                                    style={{cursor: 'pointer'}}>Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                                <th onClick={() => handleSort('dni')}
                                    style={{cursor: 'pointer'}}>CI {sortConfig.key === 'dni' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                                <th onClick={() => handleSort('cellphone')}
                                    style={{cursor: 'pointer'}}>Telefono {sortConfig.key === 'cellphone' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                                <th onClick={() => handleSort('role')}
                                    style={{cursor: 'pointer'}}>Rol {sortConfig.key === 'role' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                                <th onClick={() => handleSort('active')}
                                    style={{cursor: 'pointer'}}>Activo {sortConfig.key === 'active' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                                <th>C. Positivo</th>
                                <th>C. Negativo</th>
                                <th>Ultima conexion</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                users.map((item, index) => (
                                    <tr key={item.iduser}>
                                        <td><b>{index + 1}</b></td>
                                        <td>{item.username}</td>
                                        <td>{item.firstname}</td>
                                        <td>{item.surname}</td>
                                        <td>{item.credits}</td>
                                        <td>{item.cash}</td>
                                        <td>{item.email}</td>
                                        <td>{item.dni}</td>
                                        <td><a href={"https://wa.me/" + item.cellphone.substring(1)} target={"_blank"}
                                               className="link-light link-underline link-underline-opacity-0">{item.cellphone}</a>
                                        </td>
                                        <td>{rol[item.role]}</td>
                                        <td>{item.active === 1 ? "Si" : "No"}</td>
                                        <td>{item.commission_earn}%</td>
                                        <td>{item.commission_lose}%</td>
                                        <td>{DateConnection(item.last_connection)}</td>
                                        <td>
                                            <div className="d-flex flex-row">
                                                {
                                                    canEdit ? (<button className="btn btn-transparent"
                                                                       onClick={() => Edit(item)}
                                                                       title="Editar">✏️
                                                    </button>) : null

                                                }

                                                <button className="btn btn-transparent"
                                                        onClick={() => Commissions(item)} title="Comisiones">💵
                                                </button>
                                                <button className="btn btn-transparent"
                                                        onClick={() => ShowMovements(item.iduser)}
                                                        title="Movimientos">🧮
                                                </button>
                                                <button className="btn btn-transparent"
                                                        onClick={() => ShowStatistics(item.iduser, item.username)}
                                                        title="Estadisticas">📈
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>


        </div>

    );
}

export default UserList;