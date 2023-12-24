import React, { useEffect, useRef, useState, forwardRef,useImperativeHandle } from "react";
import { Modal, ModalHeader } from "react-bootstrap";
import { ForceDisconnect } from "./Game";

export const Iframe = forwardRef((props, ref) => {

    const gameframe = useRef(null);
    useImperativeHandle(ref, () => ({
        Show
    }));

    async function Hide() {
        const res = await ForceDisconnect();
        if (res === 200) {
            gameframe.current.classList.remove('show-iframe');
            gameframe.current.classList.add('hide');
            window.location.reload();
        }
    }

    function Show() {
        gameframe.current.classList.remove('hide');
        gameframe.current.classList.add('show-iframe');
    }

    return (
        // <div className="hide" ref={gameframe}>
        //     <iframe
        //         title="Slot frame"
        //         src={props.url}
        //         width="100%"
        //         height="100%"
        //         allow="autoplay">
        //     </iframe>
        //     <button onClick={Hide} className="btn btn-danger close"><b>SALIR</b></button>
        // </div>
        <Modal backdrop="static" show={props.show} onHide={props.showGame} fullscreen={true}>
            <ModalHeader className="bg-success text-white" closeButton>{props.title}</ModalHeader>
            <iframe
                title="Slot frame"
                src="https://tupapo.games"//{props.url}
                width="100%"
                height="100%"
                allow="autoplay">
            </iframe>
        </Modal>
    );
});

export default Iframe;