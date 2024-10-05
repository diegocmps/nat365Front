import PropTypes from 'prop-types';
import { Marker, Popup} from 'react-leaflet';

export function Marcadores({ localidade }) {


    return (
        <>
            {localidade.map(local => (
                <Marker
                    key={local.id}
                    position={[parseFloat(local.latitude), parseFloat(local.longitude)]}>

                    <Popup>
                        <strong>{local.local}</strong>
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
