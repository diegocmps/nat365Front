import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../utils/useAxios";
import { Map } from "../../components/Mapa";
import './localDetalhes.css';

export function LocalDetalhes() {
    const { localId } = useParams();
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

    const { latitude, longitude, nome, descricao, cep } = local;
    const enderecoCompleto = `${local.rua}, ${local.bairro}, ${local.cidade}, ${local.estado}`;
    const googleMapsLink = `https://www.google.com/maps/?q=${latitude},${longitude}`;

    return (
        <div className="local-detalhes-page">
            <button className="voltar-button">
                <Link to={'/'}>Voltar</Link>
            </button>
            <div className="local-detalhes-container">
                <div className="local-detalhes-content">
                    <div className="local-detalhes">
                        <h2>{nome}</h2>
                        <p><strong>Descrição:</strong> {descricao}</p>
                        <p><strong>CEP:</strong> {cep}</p>
                        <p><strong>Endereço:</strong> {enderecoCompleto}</p>
                        <p><strong>Latitude:</strong> {latitude}</p>
                        <p><strong>Longitude:</strong> {longitude}</p>
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