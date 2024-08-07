import './dashboard.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { Marcadores } from '../../components/Marcadores';
import { fetchLocalidades } from '../../utils/api';

const coordInicial = [-27.605267967416903, -48.404921917707085];

export function HomePage() {
    const [localidades, setLocalidades] = useState([]);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchLocalidades();
                setLocalidades(data);
            } catch (error) {
                console.error('Erro ao buscar localidades:', error);
            }
        }

        loadData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <MapContainer
                    center={coordInicial}
                    zoom={7}
                    className='mapContainer'
                >
                    <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                    <Marcadores localidade={localidades} />
                </MapContainer>
            </div>
        </div>
    );
}

