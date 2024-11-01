import { useForm } from "react-hook-form";
import { getCepData } from "../../services/CepService/CepService";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/useAxios";
import { useAuth } from "../../contexts/auth";
import './editarLocal.css';

export function PaginaEditarLocal() {
    const { register, handleSubmit, reset, setValue } = useForm();
    const { id } = useParams();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    async function onUpdate(data) {
        if (!user) {
            alert('Você precisa estar logado para atualizar um local');
            return;
        }

        const localData = {
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
        } catch (error) {
            console.error('Erro ao atualizar localidade:', error);
            alert('Houve um erro ao atualizar o local. Tente novamente mais tarde.');
        }
    }

    async function buscarLocal() {
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
        }
    }

    useEffect(() => {
        if (id) {
            buscarLocal();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const checkCEP = async (e) => {
        const cep = e.target.value.replace(/\D/g, '');

        if (cep.length !== 8) {
            alert('CEP inválido. Por favor, insira um CEP válido.');
            return;
        }

        try {
            const cepData = await getCepData(cep);

            setValue('rua', cepData.address_name);
            setValue('bairro', cepData.district);
            setValue('cidade', cepData.city);
            setValue('estado', cepData.state);
            setValue('latitude', cepData.lat);
            setValue('longitude', cepData.lng);
        } catch (error) {
            console.error('Erro ao buscar dados do CEP:', error);
            alert('Houve um erro ao buscar o CEP. Tente novamente mais tarde.');
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <main>
            <div>
                <form className="formulario" onSubmit={handleSubmit(onUpdate)}>
                <h1>Atualização do Local</h1>
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

                    <label htmlFor="cep">CEP</label>
                    <input
                        id="cep"
                        type="text"
                        {...register('cep', { required: 'O CEP é obrigatório' })}
                        onBlur={checkCEP}
                    />

                    <label htmlFor="rua">Rua</label>
                    <input
                        id="rua"
                        type="text"
                        {...register('rua')}
                    />

                    <label htmlFor="bairro">Bairro</label>
                    <input
                        type="text"
                        id="bairro"
                        {...register('bairro')}
                    />

                    <label htmlFor="cidade">Cidade</label>
                    <input
                        id="cidade"
                        type="text"
                        {...register('cidade')}
                    />

                    <label htmlFor="estado">Estado</label>
                    <input
                        id="estado"
                        type="text"
                        {...register('estado')}
                    />

                    <label htmlFor="latitude">Latitude</label>
                    <input
                        id="latitude"
                        type="text"
                        {...register('latitude')}
                    />

                    <label htmlFor="longitude">Longitude</label>
                    <input
                        id="longitude"
                        type="text"
                        {...register('longitude')}
                    />

                    <button type="submit">Atualizar</button>
                </form>
            </div>
        </main>
    );
}