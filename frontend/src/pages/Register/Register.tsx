import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    return (
        <div className="register-container">
            <form className="register-form">
                <h2>Criar Conta</h2>
                <div className="register-input-group">
                    <label htmlFor="name">Nome Completo</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="register-input-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="register-input-group">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                </div>
                <button type="button" className="register-button">Cadastrar</button>
                <button type="button" className="register-link-button" onClick={() => navigate('/login')}>
                    Já tem uma conta? Faça login
                </button>
            </form>
        </div>
    );
}