import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../utils/useAxios"; // Atualizado para importar o axios
import { Map } from "../../components/Mapa";
import './localDetalhes.css';

export function LocalDetalhes() {
    const { localId } = useParams(); // Atualizado para localId
    const [local, setLocal] = useState(null);

    useEffect(() => {
        async function fetchLocal() {
            try {
                
                const resposta = await api.get(`/local/${localId}`); 
                console.log("Resposta da API:", resposta);
                console.log("Dados do local:", resposta.data);
                setLocal(resposta.data);
            } catch (error) {
                console.error("Erro ao buscar o local:", error);
            }
        }

        fetchLocal();
    }, [localId]);

    if (!local) {
        return <div>Carregando...</div>;
    }

    const latitude = local.latitude;
    const longitude = local.longitude;

    const googleMapsLink = `https://www.google.com/maps/?q=${latitude},${longitude}`;

    return (
        <div className="local-detalhes-page">
            <button className="voltar-button">
                <Link to={-1}>Voltar</Link>
            </button>
            <div className="local-detalhes-container">
                <div className="local-detalhes-content">
                    <div className="local-detalhes">
                        <h2>{local.nome}</h2>
                        <p><strong>Descrição:</strong> {local.descricao}</p>
                        <p><strong>CEP:</strong> {local.cep}</p>
                        <p><strong>Latitude:</strong> {latitude}</p>
                        <p><strong>Longitude:</strong> {longitude}</p>
                        <p><strong>Cadastrado por:</strong> {local.usuarioId}</p>
                        <p>
                            <strong>Ver no Google Maps: </strong> 
                            <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
                                Clique aqui
                            </a>
                        </p>
                    </div>
                </div>

                <div className="map-local-detalhes">
                    <Map localidades={[local]} localDetalhe={local} />
                </div>
            </div>
        </div>
    );
}
