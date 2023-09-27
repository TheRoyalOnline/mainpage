import React, { useEffect, useState } from "react";
import { Modal, ModalHeader } from "react-bootstrap";

export const Iframe = (props) => {

    return (
        <Modal className="bg-dark" backdrop="static" show={props.show} onHide={props.showGame} fullscreen={true}>
            <ModalHeader closeButton></ModalHeader>
            <iframe
                src={props.url}
                title="Contenido externo"
                width="100%"
                height="100%">
            </iframe>
        </Modal>
    );
}

export default Iframe;