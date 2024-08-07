import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Marcadores } from '../Marcadores';
import './map.css'


const coordInicial = [-27.535897962234078, -48.68320357136021];

// eslint-disable-next-line react/prop-types
export function Map({ localidades }) {
    return (
        <div>
            <MapContainer
                center={coordInicial}
                zoom={6}
                className='mapContainer'
            >
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                <Marcadores localidade={localidades} />
            </MapContainer>
        </div>
    );
}
