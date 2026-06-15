import './Dashboard.css';

export function Dashboard() {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Desafio Cadastro</h1>
                <button className="logout-button">Sair</button>
            </header>
            <main className="dashboard-main">
                <div className="card">
                    <h2>Bem-vindo(a)!</h2>
                    <p>ADD INFOS AQUI</p>
                </div>
            </main>
        </div>
    );
}