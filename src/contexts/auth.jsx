import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
import api from "../utils/useAxios";

export const AuthContext = createContext({
    user: null,
    isLogged: false,
    signIn: async () => { },
    signOut: async () => { },
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const userLogged = localStorage.getItem('@natureza365:user');
        return userLogged ? JSON.parse(userLogged) : null;
    });

    const [isLogged, setIsLogged] = useState(!!user); 

    async function signIn({ email, password }) {
        try {
            if (!email || !password) {
                console.error('Email ou senha ausente');
                return false;
            }

            const response = await api.post('/login', {
                email,
                senha: password
            });

            if (response.status === 200) {
                const { token, user: userData } = response.data;
                setUser(userData);
                setIsLogged(true); 
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

    async function signOut() {
        setUser(null);
        setIsLogged(false); 
        const token = localStorage.getItem('token');
        console.log("Token:", token); 
        
        try {
            const response = await api.post('/login/logout', {}, {  
                headers: {
                    Authorization: `${token}`
                }
            });

            if (response.status === 200) {
                console.log(response.data.message); 
            }

            localStorage.removeItem('@natureza365:user');
            localStorage.removeItem('token');
            
        } catch (error) {
            console.error('Erro ao deslogar da API:', error);
        }
    }
        
    return (
        <AuthContext.Provider value={{ user, isLogged, signIn, signOut }}>
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