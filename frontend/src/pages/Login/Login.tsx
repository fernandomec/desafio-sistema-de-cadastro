import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Acessar Conta</h2>
                <div className="login-input-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="login-input-group">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="button" className="login-button">Entrar</button>
                <button type="button" className="login-link-button" onClick={() => navigate('/register')}>
                    Não tem conta? Cadastre-se
                </button>
            </form>
        </div>
    );
}