import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
<<<<<<< HEAD
import api from "../utils/useAxios";

export const AuthContext = createContext({
    user: null,
    isLogged: false,
=======
import { api } from "../utils/api";

export const AuthContext = createContext({
    user: null,
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
    signIn: async () => { },
    signOut: async () => { },
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const userLogged = localStorage.getItem('@natureza365:user');
<<<<<<< HEAD
        return userLogged ? JSON.parse(userLogged) : null;
    });

    const [isLogged, setIsLogged] = useState(!!user); 

=======
        return userLogged ? JSON.parse(userLogged) : null; 
    });

>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
    async function signIn({ email, password }) {
        try {
            if (!email || !password) {
                console.error('Email ou senha ausente');
                return false;
            }

<<<<<<< HEAD
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
=======
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
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
            return false;
        }
    }

<<<<<<< HEAD
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
=======
    function signOut() {
        setUser(null);
        localStorage.removeItem('@natureza365:user');
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
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
