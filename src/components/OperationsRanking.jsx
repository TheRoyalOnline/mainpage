import React from "react";

const OperationsRanking = ({role, rankingDate, setRankingDate, UpdateDate, positions, SetPositions, UpdatePrizes}) => {
    if (role !== 1)
        return null;

    return (
        <div className='pt-2 text-white register'>
            <div className='border-success text-white bg-transparent'>
                <h5 className="card-header border-success text-white">Fecha limite para
                    ranking</h5>

                <div className='flex-column p-3'>
                    <div className="form-group justify-content-center row pt-3">
                        <label className="col-sm-3 col-form-label">Hasta:</label>
                        <div className="col-sm-5">
                            <div className="input-group">
                                <input type="date"
                                       className="input-group-text bg-dark border-success text-white h-100"
                                       value={rankingDate}
                                       onChange={e => setRankingDate(e.target.value)}/>
                            </div>
                        </div>
                        <div className='d-flex flex-column container w-75'>
                            <button className="btn btn-success mt-3" type="button"
                                    onClick={UpdateDate}>Actualizar fecha
                            </button>
                        </div>
                        <div className="table-responsive pt-4">
                            <table className="table table-dark table-striped text-center">
                                <thead>
                                <tr>
                                    <th>Posicion</th>
                                    <th>Premio</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    positions.map((item, index) => (
                                        <tr>
                                            <td key={item.id}>{item.position}</td>
                                            <td className='text-center'><input type="number"
                                                                               className="input-group-text  bg-dark border-success text-white h-100 w-100"
                                                                               value={item.prize}
                                                                               min={0}
                                                                               onChange={(e) => SetPositions(index, e.target.value)}/>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className='d-flex flex-column container w-75'>
                            <button className="btn btn-success mt-3" type="button"
                                    onClick={UpdatePrizes}>Actualizar premios
                            </button>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default OperationsRanking;