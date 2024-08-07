// src/pages/HomePage.jsx

import './dashboard.css';
import { useState, useEffect } from 'react';
import { fetchLocalidades } from '../../utils/api';
import { CardUsuarios } from '../../components/CardUsuarios';
import { Map } from '../../components/Mapa';
import { CardLocais } from '../../components/CardLocais';

export function HomePage() {
    const [localidadesLimitadas, setLocalidadesLimitadas] = useState([]);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchLocalidades();
                setLocalidadesLimitadas(data.slice(0, 6));
            } catch (error) {
                console.error('Erro ao buscar localidades:', error);
            }
        }

        loadData();
    }, []);

    return (
        <div className="dashboard">
            <div className="dashboard-top">
                <div className="logo-container">
                    <img className="logo" src="./src/assets/imagens/logo.png" alt="logo" />
                </div>
                <div className="cards-container">
                    <CardUsuarios />
                    <CardLocais />
                </div>
            </div>

            <div className="content">
                <div className="local-list">
                    <h2>Locais Cadastrados</h2>
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <td>Local</td>
                                <td>Descrição</td>
                                <td>Usuário</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                localidadesLimitadas.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.local}</td>
                                        <td>{item.descricao}</td>
                                        <td>{item.usuario}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className="map-dashboard">
                    <Map localidades={localidadesLimitadas} />
                </div>
            </div>
        </div>
    );
}
