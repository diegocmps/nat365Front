<<<<<<< HEAD
import './dashboard.css';
import { useState, useEffect } from 'react';
=======
// src/pages/HomePage.jsx
import './dashboard.css';
import { useState, useEffect } from 'react';
import { fetchLocalidades } from '../../utils/api';
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
import { CardUsuarios } from '../../components/CardUsuarios';
import { Map } from '../../components/Mapa';
import { CardLocais } from '../../components/CardLocais';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import SideBar from '../../components/sidebar/sidebar';
import api from '../../utils/useAxios';
import boneco1 from '../../assets/imagens/boneco1.png';

export function HomePage() {
    const [localidades, setLocalidades] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [userCount, setUsercount] = useState(0);
    const [localCount, setLocalCount] = useState(0)
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        async function loadData() {

            try {

                const response = await api.get(`/dashboard?page=${currentPage}&limit=${itemsPerPage}`);
                setLocalidades(response.data.dados.locais);
                setUsercount(response.data.dados.usuariosOnline)
                setLocalCount(response.data.dados.locaisTotal)
                console.log('Resposta da API:', response.data);
            } catch (error) {
                console.error('Erro ao buscar localidades:', error);

                if (error.response) {
                    console.error('Status do erro:', error.response.status);
                    console.error('Dados do erro:', error.response.data);
                } else {
                    console.error('Erro de rede ou outro:', error.message);
                }
            }
        }
        console.log(currentPage)
        loadData();
    }, [currentPage, itemsPerPage]);
    
    const currentLocalidades = localidades

    const nextPage = () => {
        if (currentPage < Math.ceil(localCount / itemsPerPage)) {
            setCurrentPage(currentPage + 1);

        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="dashboard-layout">
            <SideBar />
            <div className="dashboard">
                <div className="dashboard-top">
                    <div className="cards-container">
                        <img className="boneco" src={boneco1} alt="logo" />
                        <CardUsuarios userCount={userCount} />
                        <CardLocais localCount={localCount} />
                    </div>
                </div>

                <div className="content">
                    <div className="local-list">
                        <h2>Locais Cadastrados</h2>
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>Local</th>
                                    <th>Descrição</th>
                                    <th>Usuário</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentLocalidades.map((item) => (
                                        <tr key={item.id}>
                                            <td data-label="Local"><Link to={`/localidade/detalhes/${item.id}`}>{item.nome}</Link></td>
                                            <td data-label="Descrição">{item.descricao}</td>
                                            <td data-label="Usuário">{item.usuario.nome}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div className="pagination">
                            <button onClick={prevPage} disabled={currentPage === 1}>
                                Anterior
                            </button>
                            <span>Página {currentPage}</span>
                            <button onClick={() => nextPage()} disabled={currentPage === Math.ceil(localCount / itemsPerPage)}>
                                Próxima
                            </button>
                        </div>
                    </div>

                    <div className="map-dashboard">
                        <Map localidades={currentLocalidades} />
                    </div>
=======

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
            <th>Local</th>
            <th>Descrição</th>
            <th>Usuário</th>
        </tr>
    </thead>
    <tbody>
        {
            localidadesLimitadas.map((item) => (
                <tr key={item.id}>
                    <td data-label="Local"><Link to={`/dashboard/localidade/detalhes/${item.id}`}>{item.local}</Link></td>
                    <td data-label="Descrição">{item.descricao}</td>
                    <td data-label="Usuário">{item.usuario}</td>
                </tr>
            ))
        }
    </tbody>
</table>

                </div>

                <div className="map-dashboard">
                    <Map localidades={localidadesLimitadas} />
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                </div>
            </div>
        </div>
    );
}
