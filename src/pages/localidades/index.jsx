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
        if (!user) {
            alert('Você precisa estar logado para cadastrar um local');
            return;
        }

        const localData = {
            ...dataLocais,
            usuario: user.nome
        };

        try {
            const resposta = await api('/localidade', {
                method: 'POST',
                body: JSON.stringify(localData),
                headers: {
                    'Content-Type': 'application/json'
                }
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
            <div className="form-container">
                <button className="btn-submit" onClick={handleSubmit(addLocal)}>Cadastrar</button>
                <form className="formulario" onSubmit={handleSubmit(addLocal)}>
                    <div className="form-group">
                        <label htmlFor="local">Local</label>
                        <input
                            id="local"
                            placeholder="Digite o nome do local"
                            type="text"
                            {...register('local', { required: 'O nome do local é obrigatório' })}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descricao">Descrição do local</label>
                        <textarea
                            id="descricao"
                            {...register('descricao')}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input
                            id="cep"
                            type="text"
                            {...register('endereco.cep', { required: 'O CEP é obrigatório' })}
                            onBlur={checkCEP}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="rua">Rua</label>
                        <input
                            id="rua"
                            type="text"
                            {...register('endereco.rua')}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="bairro">Bairro</label>
                            <input
                                id="bairro"
                                type="text"
                                {...register('endereco.bairro')}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cidade">Cidade</label>
                            <input
                                id="cidade"
                                type="text"
                                {...register('endereco.cidade')}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="estado">Estado</label>
                            <input
                                id="estado"
                                type="text"
                                {...register('endereco.estado')}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="latitude">Latitude</label>
                            <input
                                id="latitude"
                                type="text"
                                {...register('endereco.latitude')}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="longitude">Longitude</label>
                            <input
                                id="longitude"
                                type="text"
                                {...register('endereco.longitude')}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </main>
    ) : <Navigate to="/" />;
}
