import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsersList } from "./API";
import Cookies from "universal-cookie";

export const UserList = () => {
    const rol = {
        1: "Administrador",
        2: "Caja",
        3: "Operador",
        4: "Vendedor",
        5: "Cliente"
    }

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    
    useEffect(() => {  
        
        Start();
    }, []);
    
    async function Start() {
        const cookie = new Cookies();
        if (cookie.get("userdata") === undefined && cookie.get("userdata").role !== 1)
            navigate('/');
        const data = await UsersList();
        setUsers(data);
    }

    function Edit(item){
        navigate('/Operations/Editusers', { state: { user: item } })
    }
    
    function Commissions(item){
        navigate('/Operations/Commissions', { state: { username: item.username, iduser: item.iduser } })
        
    }

    return (

        <div className='pt-2 text-white container' >
            <h1 className='text-center '>Lista de usuarios</h1>
            <div className='card border-success text-white bg-transparent mt-5'>

                <h5 className="card-header border-success text-white pt-4">Todos</h5>
                <div className='flex-column justify-content-center p-3'>
                    <div className="table-responsive">
                        <table className="table table-dark table-striped text-center">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Usuario</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Creditos</th>
                                    <th>Efectivo</th>
                                    <th>Email</th>
                                    <th>CI</th>
                                    <th>Rol</th>
                                    <th>Activo</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((item, index) => (
                                        <tr key={item.iduser}>
                                            <td><b>{index+1}</b></td>
                                            <td>{item.username}</td>
                                            <td>{item.firstname}</td>
                                            <td>{item.surname}</td>
                                            <td>{item.credits}</td>
                                            <td>{item.cash}</td>
                                            <td>{item.email}</td>
                                            <td>{item.dni}</td>
                                            <td>{rol[item.role]}</td>
                                            <td>{item.active === 1? "Si":"No"}</td>
                                            <td><div className="d-flex flex-row">
                                                <button className="btn btn-transparent" onClick={e => Edit(item)} title="Editar">✏️</button>
                                                <button className="btn btn-transparent" onClick={e => Commissions(item)} title="Comisiones">💵</button>
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