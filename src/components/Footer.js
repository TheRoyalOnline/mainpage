import React from 'react';
import {FaFacebook, FaInstagram, FaWeebly} from 'react-icons/fa'

export const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className='py-4 bg-black d-flex flex-column'>
            <ul className="nav container d-flex justify-content-center pb-4">
                <li><a href="#" className='text-white p-2'><FaFacebook /></a></li>
                <li><a href="#" className='text-white p-2'><FaInstagram /></a></li>
                <li><a href="#" className='text-white p-2'><FaWeebly /></a></li>
            </ul>
            <div class="text-center text-white"> © Tupapõ Games {year} - Asunción, Paraguay</div>

        </footer>
    );
};

export default Footer;

               

