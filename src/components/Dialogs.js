import React from "react";
import { Modal } from "react-bootstrap";

export const ShowDialog = (props) => {

    return (
        <Modal className="container-fluid" backdrop="static" show={props.show} onHide={props.handler} centered={true}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <p dangerouslySetInnerHTML={{ __html: props.message }}></p>
            </Modal.Body>
            <Modal.Footer>
                {
                    props.actions ?? null
                }
            </Modal.Footer>
        </Modal>
    );
}