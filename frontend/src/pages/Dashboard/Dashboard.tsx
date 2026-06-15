import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api.ts';
import './Dashboard.css';

interface Perfil {
    id: string;
    name: string;
    email: string;
    role: string;
}

export function Dashboard() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [perfil, setPerfil] = useState<Perfil | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        api.get<{ user: Perfil }>('/auth/perfil')
            .then((data) => setPerfil(data.user))
            .catch(() => setErro('Não foi possível carregar o perfil'))
            .finally(() => setCarregando(false));
    }, []);

    function handleLogout() {
        logout();
        navigate('/login', { replace: true });
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Desafio Cadastro</h1>
                <button className="logout-button" onClick={handleLogout}>Sair</button>
            </header>

            <main className="dashboard-main">
                {carregando && <p className="dashboard-loading">Carregando...</p>}

                {erro && <p className="dashboard-erro">{erro}</p>}

                {perfil && (
                    <>
                        <div className="card">
                            <h2>Bem-vindo(a), {perfil.name}!</h2>
                        </div>

                        <div className="card card-info">
                            <h3>Seus dados</h3>
                            <ul>
                                <li><span>ID</span><span>{perfil.id}</span></li>
                                <li><span>Nome</span><span>{perfil.name}</span></li>
                                <li><span>E-mail</span><span>{perfil.email}</span></li>
                                <li><span>Role</span><span>{perfil.role}</span></li>
                            </ul>
                        </div>

                        
                    </>
                )}
            </main>
        </div>
    );
}