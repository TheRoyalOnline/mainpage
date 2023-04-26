
import { Route, Routes } from 'react-router-dom';


import MainPage from './Slots';
import Navbar from './Navbar';
import Footer from './Footer';
import SingUp from './Singup';
import Login from './Login';

export default function App() {
    return (
        <div className='containter-fluid'>

            <Navbar />
            <Routes>
                <Route exact path='/' Component={MainPage} />
                <Route exact path='/Singup' Component={SingUp} />
                <Route exact path='/Login' Component={Login} />
            </Routes>

            {/* <Footer /> */}

        </div>
    );
}

