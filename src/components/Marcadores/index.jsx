import PropTypes from 'prop-types';
import { Marker, Popup } from 'react-leaflet';

// eslint-disable-next-line react/prop-types
export function Marcadores({ localidade }) {
    return (
        <>
            {localidade.map(local => (
                <Marker
                    key={local.id}
                    position={[parseFloat(local.latitude), parseFloat(local.longitude)]}
                >
                    <Popup>
                        <strong>{local.nome}</strong>
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
