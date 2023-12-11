import React, { useEffect, useState } from "react";
import { Modal, ModalHeader } from "react-bootstrap";

export const Iframe = (props) => {

    return (
        <Modal backdrop="static" show={props.show} onHide={props.showGame} fullscreen={true}>
            <ModalHeader className="bg-success text-white" closeButton>{props.title}</ModalHeader>
            <iframe
                src={props.url}
                width="100%"
                height="100%"
                allow="autoplay">
            </iframe>
        </Modal>
    );
}

export default Iframe;