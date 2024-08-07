import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types'
import { api } from "../utils/api";

export const AuthContext = createContext({
    user: null,
    signIn: async () => { },
    signOut: async () => { },
})

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const userLogged = localStorage.getItem('@natureza365:user')
        return userLogged ? JSON.parse(userLogged) : null; // Garantir que é null se não houver usuário
    })

    async function signIn({ email, password }) {
        const response = await api(`/users?email=${email}&senha=${password}`)
        const data = await response.json()

        if (data.length > 0) {
            setUser(data[0]) // Acesso ao primeiro usuário
            localStorage.setItem('@natureza365:user', JSON.stringify(data[0])) // Armazenar o objeto do usuário

            return true
        } else {
            return false
        }
    }

    function signOut() {
        setUser(null)
        localStorage.removeItem('@natureza365:user')
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const contexto = useContext(AuthContext)
    return contexto
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
