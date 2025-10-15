import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { TiArrowBackOutline } from "react-icons/ti";
import './Login.css';
import logo from '../../assets/logo.png';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => { 
        event.preventDefault();

        try {
            
            const loginPayload = {
                email: email,
                password: password,
            };

            
            const response = await axios.post('http://localhost:8080/api/auth/login', loginPayload);

           
            alert('Login realizado com sucesso!');
            console.log('Token de acesso:', response.data.token);
            

        } catch (error) {
            
            alert('Falha no login. Verifique seu e-mail e senha.');
            console.error('Ocorreu um erro no login:', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <a href="/"><TiArrowBackOutline className='back-icon' /></a>
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <h1>Anjos Protetores de Animais Login</h1>
                <div className='input-field'>
                    {/* O `onChange` agora atualiza o estado 'email' */}
                    <input type="email" placeholder="E-mail"
                        onChange={(e) => setEmail(e.target.value)} />
                    <FaUser className='icon' />
                </div>
                <div className='input-field'>
                    <input type="password" placeholder="Senha"
                        onChange={(e) => setPassword(e.target.value)} />
                    <FaLock className='icon' />
                </div>
                <div className="recall-forget">
                    <label>
                        <input type="checkbox" />
                        Lembrar de mim
                    </label>
                    <a href="#">Esqueci minha senha</a>
                </div>
                <button>Entrar</button>
                <div className="signup-link">
                    <p>Não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
                </div>
            </form>
        </div>
    )
}

export default Login;