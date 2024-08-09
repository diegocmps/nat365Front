import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
import { api } from "../utils/api";

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

            const response = await api(`/users?email=${encodeURIComponent(email)}`);

            if (!response.ok) {
                console.error('Erro na resposta da API:', response.statusText);
                return false;
            }

            const data = await response.json();

            if (data.length > 0) {
                const user = data[0];
                if (user.senha === password) { 
                    setUser(user); 
                    localStorage.setItem('@natureza365:user', JSON.stringify(user)); 

                    return true;
                } else {
                    console.warn('Senha incorreta');
                    return false;
                }
            } else {
                console.warn('Nenhum usuário encontrado com esse e-mail');
                return false;
            }
        } catch (error) {
            console.error('Erro ao autenticar usuário:', error);
            return false;
        }
    }

    function signOut() {
        setUser(null);
        localStorage.removeItem('@natureza365:user');
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
