import { Link, useNavigate } from "react-router-dom";
import './styles.css';
import { useForm } from "react-hook-form";
import { getCepData } from "../../services/CepService/CepService";
import useAxios from '../../utils/useAxios';


export function CadastroPage() {
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        const data = {
            nome: formData.nome,
            sexo: formData.sexo,
            cpf: formData.cpf,
            data_nascimento: formData.data_nascimento,
            email: formData.email,
            senha: formData.senha,
            rua: formData.rua,
            bairro: formData.bairro,
            cidade: formData.cidade,
            estado: formData.estado,
            cep: formData.cep,
            numero: formData.numero,
            complemento: formData.complemento
        };

        try {
            const response = await useAxios.post('/usuario', data);

            if (response.status === 201) { 
                alert('Usuário cadastrado com sucesso!');
                navigate('/login');
            } else {
                alert('Erro ao cadastrar usuário: ' + response.data.message);
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error.response ? error.response.data : error.message);
            alert('Houve um erro ao cadastrar o usuário. Tente novamente.');
        }
    };

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
        } catch (error) {
            console.error('Erro ao buscar dados do CEP:', error);
            alert('Houve um erro ao buscar o CEP. Tente novamente mais tarde.');
        }
    };

    return (
        <main>
            <div className="cadastro-container">
                <h1>Cadastro de Usuário</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-layout">
                        <div className="form-field">
                            <label htmlFor="nome">Nome</label>
                            <input
                                id="nome"
                                type="text"
                                placeholder="Digite o nome do usuário"
                                {...register('nome', { required: 'O nome é obrigatório' })}
                            />
                        </div>

                        <div className="form-field half-width">
                            <label htmlFor="sexo">Sexo</label>
                            <select
                                id="sexo"
                                {...register('sexo', { required: 'O sexo é obrigatório' })}
                            >
                                <option value="">Selecione</option>
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                            </select>
                        </div>

                        <div className="form-field half-width">
                            <label htmlFor="cpf">CPF</label>
                            <input
                                id="cpf"
                                type="text"
                                placeholder="Digite o CPF"
                                {...register('cpf', { required: 'O CPF é obrigatório' })}
                            />
                        </div>

                        <div className="form-field half-width">
                            <label htmlFor="data_nascimento">Data de Nascimento</label>
                            <input
                                id="data_nascimento"
                                type="date"
                                {...register('data_nascimento', { required: 'A data de nascimento é obrigatória' })}
                            />
                        </div>

                        <div className="form-field full-width">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Digite o email"
                                {...register('email', { required: 'O email é obrigatório' })}
                            />
                        </div>

                        <div className="form-field full-width">
                            <label htmlFor="senha">Senha</label>
                            <input
                                id="senha"
                                type="password"
                                placeholder="Digite a senha"
                                {...register('senha', { required: 'A senha é obrigatória' })}
                            />
                        </div>

                        <div className="form-field full-width">
                            <label htmlFor="cep">CEP</label>
                            <input
                                id="cep"
                                type="text"
                                placeholder="Digite o CEP"
                                {...register('cep', { required: 'O CEP é obrigatório' })}
                                onBlur={checkCEP}
                            />
                        </div>

                        <div className="form-field full-width">
                            <label htmlFor="rua">Rua</label>
                            <input
                                id="rua"
                                type="text"
                                placeholder="Digite a rua"
                                {...register('rua')}
                            />
                        </div>

                        <div className="form-field full-width">
                            <label htmlFor="numero">Número</label>
                            <input
                                id="numero"
                                type="text"
                                placeholder="Digite o número"
                                {...register('numero')}
                            />
                        </div>

                        <div className="form-field full-width">
                            <label htmlFor="complemento">Complemento</label>
                            <input
                                id="complemento"
                                type="text"
                                placeholder="Digite o complemento"
                                {...register('complemento')}
                            />
                        </div>

                        <div className="form-field full-width">
                            <label htmlFor="bairro">Bairro</label>
                            <input
                                id="bairro"
                                type="text"
                                placeholder="Digite o bairro"
                                {...register('bairro')}
                            />
                        </div>

                        <div className="form-field full-width">
                            <label htmlFor="cidade">Cidade</label>
                            <input
                                id="cidade"
                                type="text"
                                placeholder="Digite a cidade"
                                {...register('cidade')}
                            />
                        </div>

                        <div className="form-field full-width">
                            <label htmlFor="estado">Estado</label>
                            <input
                                id="estado"
                                type="text"
                                placeholder="Digite o estado"
                                {...register('estado')}
                            />
                        </div>
                    </div>
                    <button className="btn-submit" type="submit">Cadastrar</button>
                </form>
                <p className="login-link">Já possui cadastro? <Link to="/login">Efetuar login</Link></p>
            </div>
        </main>
    );
}
