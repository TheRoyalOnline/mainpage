import React, { useState } from 'react';
import * as API from './API';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

export function Login() {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const initialValues = { username: "", password: "" };
  const [user, setUser] = useState(initialValues); //variable y su setter
  const [rememberme, setRemember] = useState(false);
  const year = new Date().getFullYear();

  const TryLogin = async () => {
    try {
      const res = await API.GetUser(user.username.trim(), user.password);
      console.log(res ? "logueado" : "error de logueo");
      console.log(res);
      if(res)
        setShow(false);
    } catch (error) {
      console.log(error);
    }
  };


  // useEffect(() => {
  //   TryLogin();
  // }, []);

  const OnSubmit = event => {
    event.preventDefault();
    try {
      TryLogin();
    } catch (error) {
      console.log(error);
    }
  };

  const Showing = () => {
    setShow(!show);
  }


  const InputChangeEvent = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  function CheckedEvent(event) {
    setRemember(event.target.checked);
  };

  function GoToSingup(event) {
    Showing();
    setShow(false);
    navigate("/singup");
  }

  return (
    <Modal backdrop="static" show={show} onHide={Showing} centered={true}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body >
        {/* <Login /> */}
        <main className='form-signin w-100 m-auto text-center'>
          <form onSubmit={OnSubmit}>
            <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Iniciar sesión</h1>

            <div className="form-floating">
              <input type="text" className="form-control" id="floatingInput" placeholder="User name" name='username' value={user.username} onChange={InputChangeEvent} required />
              <label htmlFor="floatingInput">Nombre de usuario</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' value={user.password} onChange={InputChangeEvent} required />
              <label htmlFor="floatingPassword">Contraseña</label>
            </div>

            <div className="checkbox mb-3 mt-3">
              <label>
                <input type="checkbox" checked={rememberme} onChange={CheckedEvent} /> Recuerdame
              </label>
            </div>
            <button className="w-100 btn btn-lg btn-dark" type="submit">Iniciar</button>
            <div className='pt-4'>
              <button className="w-100 btn btn-sm btn-dark" type="button" onClick={GoToSingup}> Registrarse</button>
            </div>
            <div className='pt-1'>
              <button className="w-100 btn btn-sm btn-dark text-white" type="button">¿Olvidaste tu contraseña?</button>

            </div>
            <p className="mt-5 mb-3 text-body-secondary ">© Tupapõ Games {year} </p>
          </form>
        </main>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>

  );
};

export default Login;
