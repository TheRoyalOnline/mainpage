import React, { useRef, useState } from 'react';
import * as API from './API';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

export const Login = (props) => {
  const navigate = useNavigate();

  const initialValues = { username: "", password: "" };
  const [user, setUser] = useState(initialValues); 
  const year = new Date().getFullYear();
  const userRef = useRef(null);
  const passRef = useRef(null);

  const TryLogin = async () => {
    try {
        const res = await API.Logon(user.username.trim(), user.password);
        if (res)             
            window.location.reload();        
        else {
            userRef.current.classList.add("is-invalid");
            passRef.current.classList.add("is-invalid");
        }
    } catch (error) {
       // console.log(error);
    }
};

  const OnSubmit = event => {
    event.preventDefault();
    try {
      TryLogin();
    } catch (error) {
      //console.log(error);
    }
  };


  const InputChangeEvent = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  function GoToSingup(event) {
    navigate("/singup");
    props.handler();
  }

  function GoToRecover(event) {
    navigate("/recover");
    props.handler();
  }

  return (
    <Modal className="container-fluid" backdrop="static" show={props.show} onHide={props.handler} centered={true}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <main className='form-signin w-100 m-auto text-center'>
          <form onSubmit={OnSubmit}>
            <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Iniciar sesión</h1>

            <div className="form-floating">
              <input ref={userRef} type="text" className="form-control" id="floatingInput" placeholder="User name" name='username' value={user.username} onChange={InputChangeEvent} required />
              <label htmlFor="floatingInput">Nombre de usuario</label>
            </div>
            <div className="form-floating">
              <input ref={passRef} type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' value={user.password} onChange={InputChangeEvent} required />
              <label htmlFor="floatingPassword">Contraseña</label>
              <div className="invalid-feedback" id="userfeedback">
                Usuario o contraseña invalidos.
              </div>
            </div>
            <button className="w-100 btn btn-lg btn-dark mb-3 mt-5" type="submit">Iniciar</button>
            <div className='pt-4'>
              <button className="w-100 btn btn-sm btn-dark" type="button" onClick={GoToSingup}> Registrarse</button>
            </div>
            <div className='pt-1'>
              <button className="w-100 btn btn-sm btn-dark text-white" type="button" onClick={GoToRecover}>¿Olvidaste tu contraseña?</button>

            </div>
            <p className="mt-5 mb-3 text-body-secondary ">Mantenida por <a className='link-custom' target='_blank'  rel='noreferrer' href='https://tupapo.games'><b>Tupapõ Games</b></a></p>
          </form>
        </main>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>

  );
};

export default Login;
