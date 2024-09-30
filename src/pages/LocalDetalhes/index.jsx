import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { Map } from "../../components/Mapa";
import './localDetalhes.css';

export function LocalDetalhes() {
    const { id } = useParams();
    const [local, setLocal] = useState(null);

    useEffect(() => {
        async function fetchLocal() {
            try {
                const resposta = await api(`/localidade/${id}`);
                const data = await resposta.json();
                console.log("Dados do local:", data);
                setLocal(data);
            } catch (error) {
                console.error("Erro ao buscar o local:", error);
            }
        }

        fetchLocal();
    }, [id]);

    if (!local) {
        return <div>Carregando...</div>;
    }

    const latitude = local.endereco.latitude;
    const longitude = local.endereco.longitude;

    const googleMapsLink = `https://www.google.com/maps/?q=${latitude},${longitude}`;

    return (
        <div className="local-detalhes-page">
            <button className="voltar-button">
                <Link to={-1}>Voltar</Link>
            </button>
            <div className="local-detalhes-container">
                <div className="local-detalhes-content">
                    <div className="local-detalhes">
                        <h2>{local.local}</h2>
                        <p><strong>Descrição:</strong> {local.descricao}</p>
                        <p><strong>CEP:</strong> {local.endereco.cep}</p>
                        <p><strong>Rua:</strong> {local.endereco.rua}</p>
                        <p><strong>Bairro:</strong> {local.endereco.bairro}</p>
                        <p><strong>Cidade:</strong> {local.endereco.cidade}</p>
                        <p><strong>Estado:</strong> {local.endereco.estado}</p>
                        <p><strong>Latitude:</strong> {latitude}</p>
                        <p><strong>Longitude:</strong> {longitude}</p>
                        <p><strong>Cadastrado por:</strong> {local.usuario}</p>
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
