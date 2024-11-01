import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Marcadores } from '../Marcadores';
import './map.css';
import { useEffect } from 'react';

const coordInicial = [-27.535897962234078, -48.68320357136021];

// eslint-disable-next-line react/prop-types
function ZoomToLocation({ local }) {
    const map = useMap();

    useEffect(() => {
        if (local) {
            map.flyTo(
                // eslint-disable-next-line react/prop-types
                [parseFloat(local.latitude), parseFloat(local.longitude)],
                12,
                { animate: true }
            );
        }
    }, [local, map]);

    return null;
}

// eslint-disable-next-line react/prop-types
export function Map({ localidades, localDetalhe }) {
    return (
        <div>
            <MapContainer
                // eslint-disable-next-line react/prop-types
                center={localDetalhe ? [parseFloat(localDetalhe.latitude), parseFloat(localDetalhe.longitude)] : coordInicial}
                zoom={6}
                className='mapContainer'
            >
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                <Marcadores localidade={localidades} />
                {localDetalhe && <ZoomToLocation local={localDetalhe} />}
            </MapContainer>
        </div>
    );
}