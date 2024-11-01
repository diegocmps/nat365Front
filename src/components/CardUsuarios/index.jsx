<<<<<<< HEAD
import './cardUsuarios.css';
import { Users } from 'lucide-react';

// eslint-disable-next-line react/prop-types
export function CardUsuarios({ userCount }) {

    return (
<div className="card-usuarios">
    <span className="card-usuarios-text">Usuários ativos:</span>
    <div className="card-usuarios-content">
        <Users className="card-usuarios-icon" /> 
        <p className="card-usuarios-count">{userCount}</p> 
    </div>
</div>

=======
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import './cardUsuarios.css';
import { Users } from 'lucide-react';

export function CardUsuarios() {
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        async function fetchUserCount() {
            try {
                const response = await api('/users');
                const data = await response.json();
                setUserCount(data.length);
            } catch (error) {
                console.error('Erro ao buscar a quantidade de usuários:', error);
            }
        }
        

        fetchUserCount();
    }, []);

    return (
        <div className="card-usuarios">
            <span className="card-usuarios-text">Usuários ativos:</span>
            <p className="card-usuarios-count">{userCount}</p>
            <Users className="card-usuarios-icon" />
        </div>
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
    );
}
