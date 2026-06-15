import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api.ts';
import './Register.css';

interface RegisterResponse {
    message: string;
    userId: string;
}

interface ApiError {
    message?: string;
    errors?: Record<string, string[]>;
}

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit() {
        if (!name || !email || !password) {
            setErro('Preencha todos os campos.');
            return;
        }

        setErro('');
        setSucesso('');
        setCarregando(true);

        try {
            const data = await api.post<RegisterResponse>('/auth/cadastrar', { name, email, password });
            setSucesso(data.message + ' Redirecionando...');
            setTimeout(() => navigate('/login'), 1500);
        } catch (e) {
            const err = e as ApiError;
            
            if (err.errors) {
                const msgs = Object.values(err.errors).flat().join(' ');
                setErro(msgs);
            } else if (err.message) {
                setErro(err.message);
            } else {
                setErro('Erro ao cadastrar.');
            }
        } finally {
            setCarregando(false);
        }
    }

    function renderBotao() {
        if (carregando) {
            return (
                <button type="submit" className="register-button" disabled>
                    Cadastrando...
                </button>
            );
        }
        
        return (
            <button type="submit" className="register-button">
                Cadastrar
            </button>
        );
    }

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <h2>Criar Conta</h2>

                {erro && <p className="register-erro">{erro}</p>}
                {sucesso && <p className="register-sucesso">{sucesso}</p>}

                <div className="register-input-group">
                    <label htmlFor="name">Nome Completo</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name"/>
                </div>

                <div className="register-input-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                </div>

                <div className="register-input-group">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} autoComplete="new-password"/>
                </div>

                {renderBotao()}

                <Link to="/login" className="register-link-button">
                    Já tem uma conta? Faça login
                </Link>
            </form>
        </div>
    );
}