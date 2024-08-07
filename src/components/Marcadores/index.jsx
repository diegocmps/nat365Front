import PropTypes from 'prop-types';
// import { useEffect } from 'react';
import { Marker, Popup} from 'react-leaflet';

export function Marcadores({ localidade }) {

    // const map = useMap()

    // useEffect(() => {
    //     if (localidade.length > 0) {
    //         const primeiroLocaldaLista = localidade[0]

    //         map.flyTo({
    //             lat: primeiroLocaldaLista.endereco.latitude,
    //             lng: primeiroLocaldaLista.endereco.longitude,
    //         },
    //             12,
    //             {
    //                 animate: true

    //             })
    //     }
    // }, [localidade, map])



    return (
        <>
            {localidade.map(local => (
                <Marker
                    key={local.id}
                    position={[parseFloat(local.endereco.latitude), parseFloat(local.endereco.longitude)]}>

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
