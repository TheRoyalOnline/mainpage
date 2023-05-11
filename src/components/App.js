
import { Route, Routes } from 'react-router-dom';
import React, {Component} from 'react';


import MainPage from './Slots';
import { SignUp } from './Signup';
import Navbar from './Navbar';
import Profile from './Profile';

class App extends Component {

    render(){
        return (
            
            <div className='containter-fluid'>
                <Navbar />
                <Routes>
                    <Route exact path='/' element={<MainPage/>} />
                    <Route exact path='/Singup' element={<SignUp/>} />
                    <Route exact path='/Profile' element={<Profile/>} />
                </Routes>
            </div>
        );

    }
}

export default App;

