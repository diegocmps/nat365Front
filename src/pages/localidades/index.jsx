import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
<<<<<<< HEAD
import { useAuth } from "../../contexts/auth";
import './localidades.css';
import { getCepData } from "../../services/CepService/CepService";
import api from "../../utils/useAxios";
import boneco2 from '../../assets/imagens/boneco2.png';

=======
import { api } from "../../utils/api";
import { useAuth } from "../../contexts/auth";
import './localidades.css';
import { getCepData } from "../../services/CepService/CepService";
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139

export function CadastroLocais() {
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();
    const { user } = useAuth();

    async function addLocal(dataLocais) {
<<<<<<< HEAD
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
=======
        if (!user) {
            alert('Você precisa estar logado para cadastrar um local');
            return;
        }

        const localData = {
            ...dataLocais,
            usuario: user.nome,
            usuarioId: user.id
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
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
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
<<<<<<< HEAD
                <img className="boneco2" src={boneco2} alt="logo"/> 
                    <h1> Cadastro de Local</h1>  
=======
                    <h1>Cadastro de Local</h1>
                    
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
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
<<<<<<< HEAD
                            placeholder="Rua será preenchida automaticamente"
                            {...register('endereco.rua')}
                            readOnly
=======
                            placeholder="Digite a rua"
                            {...register('endereco.rua')}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="bairro">Bairro</label>
                            <input
                                id="bairro"
                                type="text"
<<<<<<< HEAD
                                placeholder="Bairro será preenchido automaticamente"
                                {...register('endereco.bairro')}
                                readOnly
=======
                                placeholder="Digite o bairro"
                                {...register('endereco.bairro')}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cidade">Cidade</label>
                            <input
                                id="cidade"
                                type="text"
<<<<<<< HEAD
                                placeholder="Cidade será preenchida automaticamente"
                                {...register('endereco.cidade')}
                                readOnly
=======
                                placeholder="Digite a cidade"
                                {...register('endereco.cidade')}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="estado">Estado</label>
                            <input
                                id="estado"
                                type="text"
<<<<<<< HEAD
                                placeholder="Estado será preenchido automaticamente"
                                {...register('endereco.estado')}
                                readOnly
=======
                                placeholder="Digite o estado"
                                {...register('endereco.estado')}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="latitude">Latitude</label>
                            <input
                                id="latitude"
                                type="text"
<<<<<<< HEAD
                                placeholder="Latitude será preenchida automaticamente"
                                {...register('endereco.latitude')}
                                readOnly
=======
                                placeholder="Digite a latitude"
                                {...register('endereco.latitude')}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="longitude">Longitude</label>
                            <input
                                id="longitude"
                                type="text"
<<<<<<< HEAD
                                placeholder="Longitude será preenchida automaticamente"
                                {...register('endereco.longitude')}
                                readOnly
=======
                                placeholder="Digite a longitude"
                                {...register('endereco.longitude')}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                            />
                        </div>
                    </div>

<<<<<<< HEAD
                    <button className="btn-submit-loc" type="submit">Cadastrar</button>
=======
                    <button className="btn-submit" type="submit">Cadastrar</button>
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                </form>
            </div>
        </main>
    ) : <Navigate to="/" />;
}
