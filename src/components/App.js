
import { Route, Routes } from 'react-router-dom';


import MainPage from './Slots';
import SingUp from './Singup';
import Login from './Login';
import Navbar from './Navbar';

export default function App() {
    return (
        <div className='containter-fluid'>

            <Navbar />
            <Routes>
                <Route exact path='/' Component={MainPage} />
                <Route exact path='/Singup' Component={SingUp} />
            </Routes>


        </div>
    );
}

