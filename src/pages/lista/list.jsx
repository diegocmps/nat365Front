import { useState } from "react"
import { useAuth } from "../../contexts/auth"
import { Navigate } from "react-router-dom"
import './list.css'


export function List() {

    const {user} = useAuth()

    const [lista, setLista] = useState([])

    console.log(lista)

    async function carregarDados() {
        const resposta = await fetch('http://localhost:3000/localidade')

        setLista(await resposta.json())

    }

    return user ? (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Local</td>
                        <td>Descricação</td>
                    </tr>
                </thead>

                <tbody>
                    {
                        lista.map((item) => (
                            // eslint-disable-next-line react/jsx-key
                            <tr>
                                <td>{item.local}</td>
                                <td>{item.descricao}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


            <button onClick={carregarDados}>Carregar dados</button>
        </div>
    ) : <Navigate to="/"/>
}