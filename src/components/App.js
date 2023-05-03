
import { Route, Routes } from 'react-router-dom';


import MainPage from './Slots';
import Signup from './Signup';
import Navbar from './Navbar';

export default function App() {
    return (
        <div className='containter-fluid'>

            <Navbar />
            <Routes>
                <Route exact path='/' Component={MainPage} />
                <Route exact path='/Singup' Component={Signup} />
            </Routes>


        </div>
    );
}

