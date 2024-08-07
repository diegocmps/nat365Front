import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";
import { useAuth } from "../../contexts/auth";
import './localidades.css';
import { getCepData } from "../../services/CepService/CepService";



export function CadastroLocais() {
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();
    const { user } = useAuth();

    async function addLocal(dataLocais) {
        try {
            const resposta = await api('/localidade', {
                method: 'post',
                body: JSON.stringify(dataLocais)
            });

            if (!resposta.ok) {
                alert('Houve um erro ao cadastrar o local');
            } else {
                alert('Cadastrado com sucesso');
                navigate('/dashboard');
            }
        } catch (error) {
            alert('Houve um erro ao cadastrar o local');
            console.log(error.message);
        }
    }

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

    return user ? (
        <main>
            <div>
                <form className="formulario" onSubmit={handleSubmit(addLocal)}>
                    <label htmlFor="local">Local</label>
                    <input
                        id="local"
                        placeholder="Digite o nome do usuário"
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
                        type="number"
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
                        type="text"
                        {...register('endereco.latitude')}
                    />

                    <label htmlFor="longitude">Longitude</label>
                    <input
                        type="text"
                        {...register('endereco.longitude')}
                    />

                    <button className="btn btn-primary w-100 py-2" type="submit">Cadastrar</button>
                </form>
            </div>
        </main>
    ) : <Navigate to="/" />;
}
