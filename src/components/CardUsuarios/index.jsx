// src/components/CardUsuarios.jsx
import { useEffect, useState } from "react";
import { api } from "../../utils/api"; // Ajuste o caminho se necessário
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
    );
}
