import './dashboard.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { Marcadores } from '../../components/Marcadores';
import { fetchLocalidades } from '../../utils/api';
import { CardUsuarios } from '../../components/CardUsuarios';

const coordInicial = [-27.605267967416903, -48.404921917707085];

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
            <h1>Dashboard</h1>

            <div className="dashboard-top">
                <CardUsuarios />
                <div className="map-container">
                    <MapContainer
                        center={coordInicial}
                        zoom={7}
                        className='mapContainer'
                    >
                        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                        <Marcadores localidade={localidadesLimitadas} />
                    </MapContainer>
                </div>
            </div>

            <div className="local-list">
                <h2>Locais Cadastrados</h2>
                <table>
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
        </div>
    );
}
