import { useNavigate } from 'react-router-dom';
import './404.css';

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="notfound-container">
            <main className="notfound-main">
                <h1>404</h1>
                <h2>Página não encontrada</h2>
                <button onClick={() => navigate('/login')} className="home-button">
                    Voltar para o Início
                </button>
            </main>
        </div>
    );
}