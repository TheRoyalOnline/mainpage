import React, { useEffect, useState } from 'react'
import * as API from './API'

export const Login = () => {
  const initialValues = {username:"", password:""};
  const [user, setUser] = useState(initialValues);//variable y su setter


  const TryLogin = async () =>{
    try{      
      const res = await API.GetUser(user.username.trim(), user.password);  
      console.log(res?"logueado":"error de logueo");
      
    }catch(error){
      console.log(error);
    }
  };



  // useEffect(() => {
  //   TryLogin();
  // }, []);

  const OnSubmit = event =>{
    event.preventDefault();
    try{
      TryLogin();      
    }catch(error){
      console.log(error);
    }
  };

  const InputChangeEvent = event => {
      setUser({...user, [event.target.name]:event.target.value});
  };

  return (
      <main className='form-signin w-100 m-auto text-center'>
        <form onSubmit={OnSubmit}>
          <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
              <input type="text" className="form-control" id="floatingInput" placeholder="User name" name='username' value={user.username} onChange={InputChangeEvent} />
                <label htmlFor="floatingInput">User name</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword"  placeholder="Password" name='password' value={user.password} onChange={InputChangeEvent}/>
                <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            <p className="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
        </form>
      </main> 
  );
};

export default Login;

