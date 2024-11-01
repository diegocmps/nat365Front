import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
<<<<<<< HEAD
import api from "../../utils/useAxios";
=======
import { api } from "../../utils/api";
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
import { Map } from "../../components/Mapa";
import './localDetalhes.css';

export function LocalDetalhes() {
<<<<<<< HEAD
    const { localId } = useParams();
=======
    const { id } = useParams();
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
    const [local, setLocal] = useState(null);

    useEffect(() => {
        async function fetchLocal() {
            try {
<<<<<<< HEAD
                const resposta = await api.get(`/local/${localId}`);
                console.log("Resposta da API:", resposta);
                console.log("Dados do local:", resposta.data);
                setLocal(resposta.data);
=======
                const resposta = await api(`/localidade/${id}`);
                const data = await resposta.json();
                console.log("Dados do local:", data);
                setLocal(data);
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
            } catch (error) {
                console.error("Erro ao buscar o local:", error);
            }
        }

        fetchLocal();
<<<<<<< HEAD
    }, [localId]);
=======
    }, [id]);
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139

    if (!local) {
        return <div>Carregando...</div>;
    }

<<<<<<< HEAD
    const { latitude, longitude, nome, descricao, cep } = local;
    const enderecoCompleto = `${local.rua}, ${local.bairro}, ${local.cidade}, ${local.estado}`;
    const googleMapsLink = `https://www.google.com/maps/?q=${latitude},${longitude}`;

    return (
        <div className="local-detalhes-page">
            <button className="voltar-button">
                <Link to={'/'}>Voltar</Link>
=======
    return (
        <div className="local-detalhes-page">
            <button className="voltar-button">
                <Link to={-1}>Voltar</Link>
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
            </button>
            <div className="local-detalhes-container">
                <div className="local-detalhes-content">
                    <div className="local-detalhes">
<<<<<<< HEAD
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
=======
                        <h2>{local.local}</h2>
                        <p><strong>Descrição:</strong> {local.descricao}</p>
                        <p><strong>CEP:</strong> {local.endereco.cep}</p>
                        <p><strong>Rua:</strong> {local.endereco.rua}</p>
                        <p><strong>Bairro:</strong> {local.endereco.bairro}</p>
                        <p><strong>Cidade:</strong> {local.endereco.cidade}</p>
                        <p><strong>Estado:</strong> {local.endereco.estado}</p>
                        <p><strong>Latitude:</strong> {local.endereco.latitude}</p>
                        <p><strong>Longitude:</strong> {local.endereco.longitude}</p>
                        <p><strong>Cadastrado por:</strong> {local.usuario}</p>
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                    </div>
                </div>

                <div className="map-local-detalhes">
                    <Map localidades={[local]} localDetalhe={local} />
                </div>
            </div>
        </div>
    );
}
