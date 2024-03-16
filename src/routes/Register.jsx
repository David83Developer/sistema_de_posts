import { Link, useNavigate } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";

import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthUser";

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [ageDate, setAgeDate] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()
    const {register} = useContext(AuthContext)

    const handleRegister = (e) => {
        e.preventDefault()
        if(!name | !email | !ageDate | !password){
            setError("Preencha todos os campos")
        }

        const res = register(name, email, ageDate, password)

        if(res){
            setError(res)
            return
        }

        alert("Usuário cadastrado com sucesso!")
        navigate('/')
    }



    return ( 
        <div className="container">
            <h2>Registrar</h2>
            <form className="formRegister">
                <Input 
                    type='text'
                    name='name'
                    placeholder='Insira seu nome'
                    onChange={(e) => {setName(e.target.value, setError(''))}}
                />
                <Input 
                    type='email'
                    name='email'
                    placeholder='Insira seu email'
                    onChange={(e) => {setEmail(e.target.value, setError(''))}}
                    required
                />
                <Input 
                    type='text'
                    name='ageDate'
                    placeholder='Insira sua data de nascimento'
                    onChange={(e) => {setAgeDate(e.target.value, setError(''))}}
                />
                <Input 
                    type='password'
                    name='password'
                    placeholder='Insira sua senha'
                    onChange={(e) => {setPassword(e.target.value, setError(''))}}
                />
                <p className="error">{error}</p>
                <Button 
                text='Registrar'
                onClick={handleRegister}
                />
                
            </form>
            <p>Já tem uma conta? <Link to='/'>Entrar</Link></p>
        </div>
     );
}

export default Register;