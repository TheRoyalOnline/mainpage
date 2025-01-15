import {Spinner} from "react-bootstrap";
import React from "react";

const Loading = () => <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
    <Spinner className="spinner-grow text-success" animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
    </Spinner>
</div>

export default Loading;