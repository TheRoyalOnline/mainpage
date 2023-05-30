import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GetCities, GetCountries, ValidateUserName } from './APIExtras';
import { FaUser } from 'react-icons/fa';
import { SetNewUser, SendMail } from './API';
import { Modal } from 'react-bootstrap';

export const SignUp = () => {
  var invalidate = false;
  const initialValues = {
    username: "",
    password: "",
    name: "",
    surname: "",
    dni: "",
    email: "",
    birthdate: new Date().toISOString().split('T')[0],
    nationality: "PRY",
    phonecode: "+595",
    phonenumber: "",
    district: 1,
    city: "",
    street: ""
  };
  
  const [show, setShow] = useState(false);
  const [finish, setFinish] = useState(false);
  const dateBirth = useRef(null);
  const form = useRef(null);
  const btnSubmit = useRef(null);
  const txtUsername = useRef(null);
  const txtPassword = useRef(null);
  const txtReplyPassword = useRef(null);
  let ref = useRef(null);

  const navigate = useNavigate();
  const [user, setUser] = useState(initialValues);
  const [countries, setCountry] = useState([]);
  const [cities, setCity] = useState([]);

  useEffect(() => {
    async function LoadData() {
      const data = await GetCountries();
      setCountry(data);
      const data2 = await GetCities();
      setCity(data2);
    }
    LoadData();
  }, []);

  function eventManager(event) {
    navigate("/");
  }

  async function OnValidate(event) {
    var usercase = false;

    switch (event.target.name) {
      case 'birthdate':
        const currentYear = new Date().getFullYear();
        const selectedYear = event.target.value.slice(0, 4);
        invalidate = currentYear - selectedYear < 18;
        ref = dateBirth;
        break;

      case 'username':
        ref = txtUsername;
        const userfeedback = document.getElementById('userfeedback');
        if (event.target.value.length < 5 && event.target.value.length > 0) {
          userfeedback.innerHTML = 'Nombre de usuario debe contener al menos 5 caracteres.';
          invalidate = true;
        }
        else {
          invalidate = await ValidateUserName(event.target.value);
          if (invalidate)
            userfeedback.innerHTML = 'Nombre de usuario ya existe.';
        }

        usercase = true;
        break;

      case 'password':
        if (event.target.value.length > 0) {
          ref = txtPassword;
          invalidate = event.target.value.length < 8;
        }
        break;

      case 'replypassword':
        if (event.target.value.length > 0) {
          ref = txtReplyPassword;
          invalidate = user.password !== event.target.value;
        }
        break;

        default:
          break;
    }

    if (invalidate) {
      ref.current.classList.add("is-invalid");
      ref.current.classList.remove("border-success");
      if (usercase)
        ref.current.classList.remove("is-valid");
    }
    else {
      ref.current.classList.remove("is-invalid");
      ref.current.classList.add("border-success");
      if (usercase)
        ref.current.classList.add("is-valid");
    }

  }

  function OnChangeEvent(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function CallForm(){
    form.current.submit();
  }

  async function OnSubmit(e) {
    e.preventDefault();

    if (invalidate)
      return;

    btnSubmit.current.setAttribute('disabled', '');  
    const formData = new FormData(e.target);
    const res = await SetNewUser(formData);
    
    setFinish(true);
    const message = 'Favor ingrese al siguiente <a href="https://royalonline.cloud/api/confirmation/'+res+'">link</a> para confirmar su usuario.<br>Contara con 24hs a partir de ahora para confirmar este correo de lo contrario quedara invalidado.'+
    '<br><hr><br>Si usted no solicito esta inscripcion, favor dar aviso al mismo correo.'+
    '<br><br>Gracias,<br><b>Equipo Casino Royal Online.</b>'

    SendMail("Confirmacion de registro", message, formData.get('email'), res);
    
  }

  function CallModal(){
    setShow(!show);  	
  }

  function ValidateImage(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      event.target.classList.add("is-invalid");
      event.target.classList.remove("is-valid");
      event.target.classList.remove("border-success");
      event.target.value = null;
    } else {
      event.target.classList.remove("is-invalid");
      event.target.classList.add("is-valid");
    }

  }

  return (
    <form className='pt-2 text-white container register' ref={form} onSubmit={OnSubmit}>
      <h1 className='text-center '>Nuevo registro</h1>
      <div className='card border-success text-white bg-transparent mt-5'>
        <h5 className="card-header border-success text-white">Datos generales</h5>

        <div className='flex-column justify-content-center p-3'>
          <div className="justify-content-center pt-3">
            <label htmlFor="idNombre">Nombre</label>
            <input type="text" className="form-control bg-dark border-success text-white" id="idNombre" placeholder="Nombre" value={user.name} required name='name' onChange={OnChangeEvent} />
          </div>

          <div className="justify-content-center  pt-3">
            <label htmlFor="idSurname">Apellido</label>
            <input type="text" className="form-control bg-dark border-success text-white" id="idSurname" placeholder="Apellido" value={user.surname} required name='surname' onChange={OnChangeEvent} />
          </div>

          <div className="justify-content-center  pt-3">
            <label htmlFor="idDNI">Nro. CI</label>
            <input type="number" className="form-control bg-dark border-success text-white" id="idDNI" placeholder="Nro. CI" value={user.dni} required name='dni' onChange={OnChangeEvent} />
          </div>

          <div className="justify-content-center  pt-3">
            <label htmlFor="idmail">Email</label>
            <input type="email" className="form-control bg-dark border-success text-white" id="idmail" placeholder="Email" value={user.email} required name='email' onChange={OnChangeEvent} />
          </div>

          <div className="justify-content-center  pt-3">
            <label htmlFor="idnacimiento">Fecha de nacimiento</label>
            <input ref={dateBirth} type="date" className="form-control bg-dark border-success text-white" id="idnacimiento" value={user.birthdate} required name='birthdate' onChange={OnChangeEvent} onBlur={OnValidate} />
            <div className="invalid-feedback">
              Se debe ser mayor a 18 años.
            </div>
          </div>

          <div className="justify-content-center pt-3">
            <label htmlFor="idcod">Movil</label>
            <div className='d-flex'>
              <select className="form-select w-50 bg-dark border-success text-white" id="idcod" value={user.phonecode} name='phonecode' onChange={OnChangeEvent} required>
                {
                  countries.map((item) =>
                  (
                    <option key={item.id} value={item.phone}>{item.id + ": " + item.phone}</option>
                  ))
                }
              </select>
              <input type="text" className="form-control flex-fill bg-dark border-success text-white" id="idmovil" value={user.phonenumber} name='phonenumber' onChange={OnChangeEvent} required maxLength={9} />

            </div>

            <div className="justify-content-center pt-3">
              <label htmlFor="idNacionalidad">Nacionalidad</label>
              <select className="form-select bg-dark border-success text-white" id="idNacionalidad" value={user.nationality} required name='nationality' onChange={OnChangeEvent}>
                {
                  countries.map((item) =>
                  (
                    <option key={item.id} value={item.id}>{item.country}</option>
                  ))
                }
              </select>

            </div>
          </div>

        </div>

        <h5 className="card-header border-success text-white pt-4">Datos de sesión</h5>

        <div className='flex-column justify-content-center p-3'>

          <div className="justify-content-center  pt-3">
            <label htmlFor="validationServerUsername">Usuario</label>
            <div className="input-group ">
              <div className="input-group-prepend ">
                <span className="input-group-text bg-success border-success text-white text-white h-100" id="idUser"><FaUser /></span>
              </div>
              <input type="text" className="form-control bg-dark border-success text-white" id="idUser"
                placeholder="Usuario" aria-describedby="inputGroupPrepend3" required name='username' ref={txtUsername} value={user.username} onChange={OnChangeEvent} onBlur={OnValidate} autoComplete='off' />
              <div className="invalid-feedback" id="userfeedback">
                Nombre de usuario ya existe.
              </div>
            </div>

            <div className="justify-content-center  pt-3">
              <label htmlFor="idPass">Contraseña</label>
              <input type="password" className="form-control bg-dark border-success text-white" min="8" id="idPass" placeholder="Contraseña" aria-describedby="inputGroupPrepend3"
                required name='password' ref={txtPassword} value={user.password} onChange={OnChangeEvent} onBlur={OnValidate} />
              <div className="invalid-feedback">
                Contraseñas debe contener al menos 8 caracteres.
              </div>
            </div>

            <div className="justify-content-center  pt-3">
              <label htmlFor="idPass2">Repetir contraseña</label>
              <input type="password" className="form-control bg-dark border-success text-white" id="idPass2" placeholder="Repite la contraseña" aria-describedby="inputGroupPrepend3"
                required name='replypassword' ref={txtReplyPassword} onBlur={OnValidate} />
              <div className="invalid-feedback">
                Contraseñas no coinciden.
              </div>
            </div>
          </div>

        </div>

        <h5 className="card-header border-success text-white pt-4">Dirección</h5>

        <div className='flex-column justify-content-center p-3'>
          <div className="justify-content-center pt-3">
            <label htmlFor="idDir">Distrito</label>
            <select className="form-select bg-dark border-success text-white" id="idDistrito" value={user.district} name='district' onChange={OnChangeEvent} required>
              {
                cities.map(item => (
                  <option key={item.id} value={item.id}>{item.city}</option>
                ))
              }
            </select>
          </div>
          <div className="justify-content-center pt-3">
            <label htmlFor="idCiudad">Ciudad</label>
            <input type="text" className="form-control bg-dark border-success text-white" id="idCiudad" placeholder="Ciudad" value={user.city} name='city' onChange={OnChangeEvent} required />
          </div>
          <div className="justify-content-center pt-3">
            <label htmlFor="idCalle">Calle</label>
            <input type="text" className="form-control bg-dark border-success text-white" id="idCalle" placeholder="Calle" value={user.street} name='street' onChange={OnChangeEvent} required />
          </div>
        </div>

        <h5 className="card-header border-success text-white pt-4">Adjuntos</h5>

        <div className='flex-column justify-content-center p-3'>
          <div className="justify-content-center  pt-3">
            <label htmlFor="foto">Cédula</label>
            <input type="file" className="form-control bg-dark border-success text-white" id="foto" name='imgDNI' accept=".jpg,.jpeg,.png" aria-describedby="inputGroupPrepend3" onChange={ValidateImage} required />
            <label>* Foto de la cedula ambas caras. Máx. 2mb</label>
            <div className="invalid-feedback">
              La imagen seleccionada supera los 2mb.
            </div>
          </div>
        </div>


        <h5 className="card-header border-success text-white pt-4"></h5>
        <div className='text-center mt-3 mb-4'>
          <div className="form-group ">
            <div className="form-check ">
              <input className="p-2" type="checkbox" id="invalidCheck3" required />
              <label className=" p-2 form-check-label" htmlFor="invalidCheck3">
                Aceptar terminos y condiciones.
              </label>
              <div className="invalid-feedback">
                Debes aceptar los terminos para continuar.
              </div>
            </div>

            <div className='d-flex flex-column container w-75'>
              <button className="btn btn-primary mt-3" type="button" onClick={eventManager}>Leer términos</button>
              <button ref={btnSubmit} className="btn btn-success mt-3" type="submit">Registrarse</button>
            </div>

          </div>
        </div>
      </div>
      <Modal backdrop="static" show={show} onHide={CallModal} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body >
            Se procedera a la creación de su usuario. Recibira un correo electronico en {user.email}. Allí se le especificara como continuar posterior a su aprobación.
                ¿Desea continuar?
        </Modal.Body>
        <Modal.Footer>
            <button className="btn btn-success mt-3" type="button" onClick={CallForm}>Aceptar</button>
        </Modal.Footer>
      </Modal>

      <Modal backdrop="static" show={finish} centered={true}>
        <Modal.Header>
          <Modal.Title>Usuario creado! 😁</Modal.Title>
        </Modal.Header>
        <Modal.Body >            
            Verifica tu correo electronico para activar correctamente tu usuario.
        </Modal.Body>
        <Modal.Footer>
            <button className="btn btn-success mt-3" type="button" onClick={eventManager}>Volver</button>
        </Modal.Footer>
      </Modal>
    </form>
  );

};

export default SignUp;


