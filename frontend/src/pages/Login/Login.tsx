import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api.ts';
import './Login.css';

interface LoginResponse {
    token: string;
    message: string;
}

interface ApiError {
    message?: string;
    errors?: Record<string, string[]>;
}

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit() {
        if (!email || !password) {
            setErro('Preencha todos os campos.');
            return;
        }

        setErro('');
        setCarregando(true);

        try {
            const data = await api.post<LoginResponse>('/auth/entrar', { email, password });
            login(data.token);
            navigate('/dashboard', { replace: true });
        } catch (e) {
            const err = e as ApiError;
            if (err.errors) {
                const msgs = Object.values(err.errors).flat().join(' ');
                setErro(msgs);
            } else if (err.message) {
                setErro(err.message);
            } else {
                setErro('Erro ao fazer login.');
            }
        } finally {
            setCarregando(false);
        }
    }

    function renderBotao() {
        if (carregando) {
            return <button type="submit" className="login-button" disabled>Entrando...</button>;
        }
        return <button type="submit" className="login-button">Entrar</button>;
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <h2>Acessar Conta</h2>

                {erro && <p className="login-erro">{erro}</p>}

                <div className="login-input-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"/>
                </div>

                <div className="login-input-group">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password"/>
                </div>

                {renderBotao()}

                <Link to="/register" className="login-link-button">
                    Não tem conta? Cadastre-se
                </Link>
            </form>
        </div>
    );
}