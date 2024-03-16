import './RoutesStyle.css'

import Input from "../components/Input";
import Button from "../components/Button";

import {Link, useNavigate} from 'react-router-dom'
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthUser';

function Login() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {login} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        if(!name | !password){
            setError("Preencha todos os campos")
            return
        }
        const res = login(name, password)

        if(res){
            setError(res)
            return
        }
        navigate('/home')
    }

    return ( 
        
        <div className="container">
            <h2>ENTRAR</h2>
            <form>
                <Input
                placeholder='Insira seu nome'
                type='text'
                name='name'
                onChange={(e) => {setName(e.target.value), setError('')}}
                required
                />
                <Input 
                placeholder='Insira sua senha'
                type='password'
                name='password'
                onChange={(e) => {setPassword(e.target.value), setError('')}}
                required
                />
                <p className='error'>{error}</p>
                <Button 
                text='Entrar'
                onClick={handleLogin}
                />
            </form>
            <p>não tem uma conta? <Link to='/register'>Registre-se</Link></p>
        </div>
        
     );
}

export default Login