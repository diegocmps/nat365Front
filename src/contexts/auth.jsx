import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types'
import { api } from "../utils/api";


export const AuthContext = createContext({
    user: null,
    signIn: async () => { },
})

export function AuthProvider({ children }) {
    const [user, setUser] = useState(()=> {
        const userLogged = localStorage.getItem('@natureza365:user')

        if(userLogged) {
           return JSON.parse(userLogged)
        }
    })

    async function signIn({ email, password }) {
        const response = await api(`/users?email=${email}&senha=${password}`)
        const data = await response.json()

        if (data.length > 0) {
            setUser(data)
            localStorage.setItem('@natureza365:user', JSON.stringify(data))

            return true
        } else {
            return false

        }


    }

    return (
        <AuthContext.Provider value={{ user, signIn }}>
            {children}
        </AuthContext.Provider>


    )
}



export function useAuth() {
    const contexto = useContext(AuthContext)

    return contexto
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}