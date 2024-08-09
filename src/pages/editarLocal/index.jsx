import { useForm } from "react-hook-form";
import { getCepData } from "../../services/CepService/CepService";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { useAuth } from "../../contexts/auth";

export function PaginaEditarLocal() {
    const { register, handleSubmit, reset, setValue } = useForm();
    const { id } = useParams();
    const { user } = useAuth(); 

    async function onUpdate(data) {
        if (!user) {
            alert('Você precisa estar logado para atualizar um local');
            return;
        }

        const localData = {
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
        } catch (error) {
            console.error('Erro ao atualizar localidade:', error);
            alert('Houve um erro ao atualizar o local. Tente novamente mais tarde.');
        }
    }

    async function buscarLocal() {
        try {
            const response = await api(`/localidade?id=${id}`);
            const data = await response.json();

            if (data.length > 0) {
                const local = data[0];
                reset(local);
            }
        } catch (error) {
            console.error('Erro ao buscar localidade:', error);
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

            setValue('endereco.rua', cepData.address_name);
            setValue('endereco.bairro', cepData.district);
            setValue('endereco.cidade', cepData.city);
            setValue('endereco.estado', cepData.state);
            setValue('endereco.latitude', cepData.lat);
            setValue('endereco.longitude', cepData.lng);
        } catch (error) {
            console.error('Erro ao buscar dados do CEP:', error);
            alert('Houve um erro ao buscar o CEP. Tente novamente mais tarde.');
        }
    };

    return (
        <main>
            <div>
                <form className="formulario" onSubmit={handleSubmit(onUpdate)}>
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

                    <label htmlFor="endereco">Endereço</label>
                    <label htmlFor="cep">CEP</label>
                    <input
                        id="cep"
                        type="text"
                        {...register('endereco.cep', { required: 'O CEP é obrigatório' })}
                        onBlur={checkCEP}
                    />

                    <label htmlFor="rua">Rua</label>
                    <input
                        id="rua"
                        type="text"
                        {...register('endereco.rua')}
                    />

                    <label htmlFor="bairro">Bairro</label>
                    <input
                        type="text"
                        id="bairro"
                        {...register('endereco.bairro')}
                    />

                    <label htmlFor="cidade">Cidade</label>
                    <input
                        id="cidade"
                        type="text"
                        {...register('endereco.cidade')}
                    />

                    <label htmlFor="estado">Estado</label>
                    <input
                        id="estado"
                        type="text"
                        {...register('endereco.estado')}
                    />

                    <label htmlFor="latitude">Latitude</label>
                    <input
                        id="latitude"
                        type="text"
                        {...register('endereco.latitude')}
                    />

                    <label htmlFor="longitude">Longitude</label>
                    <input
                        id="longitude"
                        type="text"
                        {...register('endereco.longitude')}
                    />

                    <button
                        className="btn btn-primary w-100 py-2"
                        type="submit">Atualizar</button>
                </form>
            </div>
        </main>
    );
}
