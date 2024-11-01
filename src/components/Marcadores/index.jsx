import PropTypes from 'prop-types';
<<<<<<< HEAD
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import markerIcon from '../../assets/imagens/leaf-green.png';
import shadowIcon from '../../assets/imagens/leaf-shadow.png';

const customMarkerIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: shadowIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

// eslint-disable-next-line react/prop-types
export function Marcadores({ localidade }) {
=======
import { Marker, Popup} from 'react-leaflet';

export function Marcadores({ localidade }) {


>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
    return (
        <>
            {localidade.map(local => (
                <Marker
                    key={local.id}
<<<<<<< HEAD
                    position={[parseFloat(local.latitude), parseFloat(local.longitude)]}
                    icon={customMarkerIcon}
                >
                    <Popup>
                        <strong>{local.nome}</strong>
=======
                    position={[parseFloat(local.endereco.latitude), parseFloat(local.endereco.longitude)]}>

                    <Popup>
                        <strong>{local.local}</strong>
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                        <p>{local.descricao}</p>
                    </Popup>
                </Marker>
            ))}
        </>
    );
}

Marcadores.propTypes = {
    localidade: PropTypes.array.isRequired,
};
