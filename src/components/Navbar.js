import React from "react";
import logo from './imgs/logo.png';
import {FaUser} from 'react-icons/fa'
import { ShowLogin } from "./SweetLogin";


export const Navbar = () =>{
    return(
        // <nav className="navbar navbar-expand-lg navbar-black bg-black">
        //     <div className="container">
        //         <div className="navbar-brand mx-auto">
        //             <img src={logo} alt="Logo" height={60}/>
        //         </div>
        //     </div>
        // </nav>
        <header className="d-flex justify-content-center pb-5 ">
				 <div className="bg-black p-4 text-white roundlogo">
				 	<img src={logo} width="100px"  />
				 </div>
				 <button className="position-absolute top-0 end-0 p-2 btn-login text-white" onClick={ShowLogin}><FaUser/></button>
			</header>
    );
};

export default Navbar;