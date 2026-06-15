import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
    id: string;
    role: string;
    exp: number;
}

interface AuthUser {
    id: string;
    role: string;
}

interface AuthContextType {
    user: AuthUser | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

function isTokenValido(token: string): boolean {
    try {
        const decoded = jwtDecode<TokenPayload>(token);
        return decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() => {
        const salvo = localStorage.getItem('token');
        if (salvo && isTokenValido(salvo)) return salvo;
        localStorage.removeItem('token');
        return null;
    });

    const [user, setUser] = useState<AuthUser | null>(() => {
        const salvo = localStorage.getItem('token');
        if (salvo && isTokenValido(salvo)) {
            const decoded = jwtDecode<TokenPayload>(salvo);
            return { id: decoded.id, role: decoded.role };
        }
        return null;
    });

    useEffect(() => {
        if (!token) return;

        // verifica expiração periodicamente
        const intervalo = setInterval(() => {
            if (!isTokenValido(token)) {
                logout();
            }
        }, 60_000);// a cada minuto

        return () => clearInterval(intervalo);
    }, [token]);

    function login(novoToken: string) {
        localStorage.setItem('token', novoToken);
        const decoded = jwtDecode<TokenPayload>(novoToken);
        setToken(novoToken);
        setUser({ id: decoded.id, role: decoded.role });
    }

    function logout() {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth deve ser usado dentro do AuthProvider');
    return ctx;
}