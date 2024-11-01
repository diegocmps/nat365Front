import { useForm } from "react-hook-form";
import { getCepData } from "../../services/CepService/CepService";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/useAxios";
import { useAuth } from "../../contexts/auth";
import './editarLocal.css';
=======
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { useAuth } from "../../contexts/auth";
import './editarLocal.css'
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139

export function PaginaEditarLocal() {
    const { register, handleSubmit, reset, setValue } = useForm();
    const { id } = useParams();
<<<<<<< HEAD
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
=======
    const { user } = useAuth(); 
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139

    async function onUpdate(data) {
        if (!user) {
            alert('Você precisa estar logado para atualizar um local');
            return;
        }

        const localData = {
<<<<<<< HEAD
            nome: data.local,
            descricao: data.descricao,
            cep: data.cep,
            rua: data.rua,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
            latitude: data.latitude,
            longitude: data.longitude,
            usuarioId: user.id
        };

        try {
            const response = await api.put(`/local/${id}`, localData);

            if (response.status !== 200) {
                throw new Error('Erro ao atualizar localidade');
            }

            alert('Atualizado com sucesso');
            navigate('/');
=======
            ...data,
            usuario: user.nome 
        };

        try {
            const response = await api(`/localidade/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(localData)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar localidade');
            }

            const update = await response.json();
            alert('Atualizado com sucesso');
            console.log(update);
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
        } catch (error) {
            console.error('Erro ao atualizar localidade:', error);
            alert('Houve um erro ao atualizar o local. Tente novamente mais tarde.');
        }
    }

    async function buscarLocal() {
<<<<<<< HEAD
        setLoading(true);
        try {
            const response = await api.get(`/local/${id}`);
            const local = response.data;

            if (local) {
                reset({
                    local: local.nome,
                    descricao: local.descricao,
                    cep: local.cep,
                    rua: local.rua,
                    bairro: local.bairro,
                    cidade: local.cidade,
                    estado: local.estado,
                    latitude: local.latitude,
                    longitude: local.longitude,
                });
            } else {
                alert('Local não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar localidade:', error);
            alert('Houve um erro ao buscar os dados do local. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
=======
        try {
            const response = await api(`/localidade?id=${id}`);
            const data = await response.json();

            if (data.length > 0) {
                const local = data[0];
                reset(local);
            }
        } catch (error) {
            console.error('Erro ao buscar localidade:', error);
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
        }
    }

    useEffect(() => {
        if (id) {
            buscarLocal();
        }
<<<<<<< HEAD
        // eslint-disable-next-line react-hooks/exhaustive-deps
=======
    // eslint-disable-next-line react-hooks/exhaustive-deps
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
    }, [id]);

    const checkCEP = async (e) => {
        const cep = e.target.value.replace(/\D/g, '');

        if (cep.length !== 8) {
            alert('CEP inválido. Por favor, insira um CEP válido.');
            return;
        }

        try {
            const cepData = await getCepData(cep);

<<<<<<< HEAD
            setValue('rua', cepData.address_name);
            setValue('bairro', cepData.district);
            setValue('cidade', cepData.city);
            setValue('estado', cepData.state);
            setValue('latitude', cepData.lat);
            setValue('longitude', cepData.lng);
=======
            setValue('endereco.rua', cepData.address_name);
            setValue('endereco.bairro', cepData.district);
            setValue('endereco.cidade', cepData.city);
            setValue('endereco.estado', cepData.state);
            setValue('endereco.latitude', cepData.lat);
            setValue('endereco.longitude', cepData.lng);
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
        } catch (error) {
            console.error('Erro ao buscar dados do CEP:', error);
            alert('Houve um erro ao buscar o CEP. Tente novamente mais tarde.');
        }
    };

<<<<<<< HEAD
    if (loading) {
        return <div>Carregando...</div>;
    }

=======
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
    return (
        <main>
            <div>
                <form className="formulario" onSubmit={handleSubmit(onUpdate)}>
<<<<<<< HEAD
                <h1>Atualização do Local</h1>
=======
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                    <label htmlFor="local">Local</label>
                    <input
                        id="local"
                        placeholder="Digite o nome do local"
                        type="text"
                        {...register('local', { required: 'O nome do local é obrigatório' })}
                    />

                    <label htmlFor="descricao">Descrição do local</label>
                    <textarea
                        id="descricao"
                        type="text"
                        {...register('descricao')}
                    />

<<<<<<< HEAD
=======
                    <label htmlFor="endereco">Endereço</label>
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                    <label htmlFor="cep">CEP</label>
                    <input
                        id="cep"
                        type="text"
<<<<<<< HEAD
                        {...register('cep', { required: 'O CEP é obrigatório' })}
=======
                        {...register('endereco.cep', { required: 'O CEP é obrigatório' })}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                        onBlur={checkCEP}
                    />

                    <label htmlFor="rua">Rua</label>
                    <input
                        id="rua"
                        type="text"
<<<<<<< HEAD
                        {...register('rua')}
=======
                        {...register('endereco.rua')}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                    />

                    <label htmlFor="bairro">Bairro</label>
                    <input
                        type="text"
                        id="bairro"
<<<<<<< HEAD
                        {...register('bairro')}
=======
                        {...register('endereco.bairro')}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                    />

                    <label htmlFor="cidade">Cidade</label>
                    <input
                        id="cidade"
                        type="text"
<<<<<<< HEAD
                        {...register('cidade')}
=======
                        {...register('endereco.cidade')}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                    />

                    <label htmlFor="estado">Estado</label>
                    <input
                        id="estado"
                        type="text"
<<<<<<< HEAD
                        {...register('estado')}
=======
                        {...register('endereco.estado')}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                    />

                    <label htmlFor="latitude">Latitude</label>
                    <input
                        id="latitude"
                        type="text"
<<<<<<< HEAD
                        {...register('latitude')}
=======
                        {...register('endereco.latitude')}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                    />

                    <label htmlFor="longitude">Longitude</label>
                    <input
                        id="longitude"
                        type="text"
<<<<<<< HEAD
                        {...register('longitude')}
                    />

                    <button type="submit">Atualizar</button>
=======
                        {...register('endereco.longitude')}
                    />

                    <button
                        type="submit">Atualizar</button>
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                </form>
            </div>
        </main>
    );
}
