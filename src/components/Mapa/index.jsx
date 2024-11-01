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
<<<<<<< HEAD
        if (local) {
            map.flyTo(
                // eslint-disable-next-line react/prop-types
                [parseFloat(local.latitude), parseFloat(local.longitude)],
=======
        // eslint-disable-next-line react/prop-types
        if (local && local.endereco) {
            map.flyTo(
                // eslint-disable-next-line react/prop-types
                [parseFloat(local.endereco.latitude), parseFloat(local.endereco.longitude)],
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
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
<<<<<<< HEAD
                center={localDetalhe ? [parseFloat(localDetalhe.latitude), parseFloat(localDetalhe.longitude)] : coordInicial}
=======
                center={localDetalhe ? [parseFloat(localDetalhe.endereco.latitude), parseFloat(localDetalhe.endereco.longitude)] : coordInicial}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
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
