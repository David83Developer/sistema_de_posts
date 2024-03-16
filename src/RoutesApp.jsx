import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthUser';

const Private = ({Item}) => {
    const {signed} = useContext(AuthContext)
    return signed !== false ? <Item /> : <Login />
}

function RoutesApp() {

 

    return ( 
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Private Item={Home}/>}/>
                    <Route path="/" element={<Login />}/>
                    <Route path="*" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                </Routes>
            </BrowserRouter>
        </>
     );
}

export default RoutesApp;