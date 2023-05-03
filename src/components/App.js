
import { Route, Routes } from 'react-router-dom';


import MainPage from './Slots';
import Signup, { SignUp } from './Signup';
import Navbar from './Navbar';

export default function App() {
    return (
        <div className='containter-fluid'>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<MainPage/>} />
                <Route exact path='/Singup' element={<SignUp/>} />
            </Routes>
        </div>
    );
}

