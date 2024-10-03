import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';

export const AuthContext = createContext({
    user: null,
    signIn: async () => { },
    signOut: async () => { },
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const userLogged = localStorage.getItem('@natureza365:user');
        return userLogged ? JSON.parse(userLogged) : null; 
    });

    async function signIn({ email, password }) {
        try {
            if (!email || !password) {
                console.error('Email ou senha ausente');
                return false;
            }

            const response = await axios.post('http://localhost:3000/login', {
                email,
                senha: password
            });

            if (response.status === 200) {
                const { token, user: userData } = response.data;
                setUser(userData);
                localStorage.setItem('@natureza365:user', JSON.stringify(userData));
                localStorage.setItem('token', token);
                return true;
            } else {
                console.warn('Falha ao autenticar:', response.statusText);
                return false;
            }
        } catch (error) {
            if (error.response) {
                console.error('Erro na resposta da API:', error.response.data);
                alert(error.response.data.message || 'Erro ao logar');
            } else {
                console.error('Erro ao autenticar usuário:', error);
                alert('Erro ao logar. Tente novamente mais tarde.');
            }
            return false; 
        }
    }

    function signOut() {
        setUser(null);
        localStorage.removeItem('@natureza365:user');
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const contexto = useContext(AuthContext);
    return contexto;
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};