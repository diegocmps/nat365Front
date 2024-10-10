import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/auth";
import './localidades.css';
import { getCepData } from "../../services/CepService/CepService";
import api from "../../utils/useAxios";

export function CadastroLocais() {
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();
    const { user } = useAuth();

    async function addLocal(dataLocais) {
        const localData = {
            nome: dataLocais.local,
            descricao: dataLocais.descricao,
            cep: dataLocais.endereco.cep
        };

        try {
            const response = await api.post('/local', localData);

            if (response.status === 201) {
                const localId = response.data.id;
                alert('Cadastrado com sucesso');
                navigate(`/localidade/detalhes/${localId}`);                 
            } else {
                alert('Houve um erro ao cadastrar o local');
            }
        } catch (error) {
            alert('Houve um erro ao cadastrar o local');
            console.error("Erro ao cadastrar o local: ", error.response ? error.response.data : error.message);
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
                <form className="formulario" onSubmit={handleSubmit(addLocal)}>
                    <h1>Cadastro de Local</h1>

                    <div className="form-group">
                        <label htmlFor="local">Nome do Local</label>
                        <input
                            id="local"
                            type="text"
                            placeholder="Digite o nome do local"
                            {...register('local', { required: 'O nome do local é obrigatório' })}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descricao">Descrição do Local</label>
                        <textarea
                            id="descricao"
                            placeholder="Digite a descrição do local"
                            {...register('descricao')}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input
                            id="cep"
                            type="text"
                            placeholder="Digite o CEP"
                            {...register('endereco.cep', { required: 'O CEP é obrigatório' })}
                            onBlur={checkCEP}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="rua">Rua</label>
                        <input
                            id="rua"
                            type="text"
                            placeholder="Rua será preenchida automaticamente"
                            {...register('endereco.rua')}
                            readOnly
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="bairro">Bairro</label>
                            <input
                                id="bairro"
                                type="text"
                                placeholder="Bairro será preenchido automaticamente"
                                {...register('endereco.bairro')}
                                readOnly
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cidade">Cidade</label>
                            <input
                                id="cidade"
                                type="text"
                                placeholder="Cidade será preenchida automaticamente"
                                {...register('endereco.cidade')}
                                readOnly
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="estado">Estado</label>
                            <input
                                id="estado"
                                type="text"
                                placeholder="Estado será preenchido automaticamente"
                                {...register('endereco.estado')}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="latitude">Latitude</label>
                            <input
                                id="latitude"
                                type="text"
                                placeholder="Latitude será preenchida automaticamente"
                                {...register('endereco.latitude')}
                                readOnly
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="longitude">Longitude</label>
                            <input
                                id="longitude"
                                type="text"
                                placeholder="Longitude será preenchida automaticamente"
                                {...register('endereco.longitude')}
                                readOnly
                            />
                        </div>
                    </div>

                    <button className="btn-submit-loc" type="submit">Cadastrar</button>
                </form>
            </div>
        </main>
    ) : <Navigate to="/" />;
}
