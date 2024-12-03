import React from "react";

const OperationsAssign = ({role, OnSubmit, refCheckAssing1, OnChange, refCheckAssing2, refInputAssing, user1, CallModal}) => {
    if (role !== 1)
        return null;

    return (

        <form className='pt-2 text-white register' name='assign' id="assign"
              onSubmit={OnSubmit}>
            <div className='border-success text-white bg-transparent'>
                <h5 className="card-header border-success text-white">Asignaciones</h5>

                <div className='d-flex justify-content-center p-3'>
                    <div className="form-check form-check-inline">
                        <input ref={refCheckAssing1} className="btn-check" type="radio"
                               name="assigntype"
                               id="idcredits" value="credits" onChange={OnChange} required/>
                        <label className="btn btn-outline-success text-white"
                               htmlFor="idcredits">
                            Creditos
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input ref={refCheckAssing2} className="btn-check" type="radio"
                               name="assigntype"
                               id="idmoney" value="money" onChange={OnChange} required/>
                        <label className="btn btn-outline-success text-white" htmlFor="idmoney">
                            Guaranies
                        </label>
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className="form-group row pt-3">
                        <label htmlFor="idNombre"
                               className="col-sm-3 col-form-label">Monto</label>
                        <div className="col-sm-8">
                            <input ref={refInputAssing} type="number"
                                   className="form-control bg-dark border-success text-white"
                                   value={user1.amount} name='amount1' min={1}
                                   onChange={OnChange}
                                   required/>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className="form-inline">
                        <label htmlFor="label1 ">Asignado a:</label>
                        <label className="p-3"
                               id="label1"><b>{user1.iduser !== undefined ? '(' + user1.dni + ') ' + user1.surname + ', ' + user1.name : 'Sin Asignacion'}</b></label>
                    </div>
                </div>
                <h5 className="card-header border-success text-white pt-4"></h5>
                <div className='text-center mt-3 mb-4'>
                    <div className="form-group ">
                        <div className='d-flex flex-column container w-75'>
                            <button className="btn btn-purple mt-3 text-white" type="button"
                                    onClick={() => CallModal('op1')}>Seleccionar usuario
                            </button>
                        </div>
                        <div className='d-flex flex-column container w-75'>
                            <button className="btn btn-success mt-3" type="submit">Mandar
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </form>
    )
}

export default OperationsAssign;