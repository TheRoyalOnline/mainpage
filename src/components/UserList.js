import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsersList } from "./API";

export const UserList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    
    useEffect(() => {      
        
        Start();
    }, []);
    
    async function Start() {
        const data = await UsersList();
        setUsers(data);
    }

    function Edit(item){
        navigate('/Operations/Editusers', { state: { user: item } })
    }

    return (

        <div className='pt-2 text-white container' >
            <h1 className='text-center '>Lista de movimientos</h1>
            <div className='card border-success text-white bg-transparent mt-5'>

                <h5 className="card-header border-success text-white pt-4">Todos</h5>
                <div className='flex-column justify-content-center p-3'>
                    <div className="table-responsive">
                        <table className="table table-dark table-striped text-center">
                            <thead>
                                <tr >
                                    <th>Usuario</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th>CI</th>
                                    <th>Activo</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((item) => (
                                        <tr key={item.iduser}>
                                            <td>{item.username}</td>
                                            <td>{item.firstname}</td>
                                            <td>{item.surname}</td>
                                            <td>{item.email}</td>
                                            <td>{item.dni}</td>
                                            <td>{item.active === 1? "Si":"No"}</td>
                                            <td><button className="btn btn-transparent" onClick={e => Edit(item)}>✏️</button></td>
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