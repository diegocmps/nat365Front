import { Link, useNavigate } from "react-router-dom";
import './styles.css';
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";
import { getCepData } from "../../services/CepService/CepService";


export function CadastroPage() {
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();

    async function addUser(values) {
        try {
            const resposta = await api('/users', {
                method: 'post',
                body: JSON.stringify(values)
            });

            if (!resposta.ok) {
                alert('Houve um erro ao cadastrar o usuário');
            } else {
                alert('Cadastrado com sucesso');
                navigate('/');
            }
        } catch (error) {
            alert('Houve um erro ao cadastrar o usuário');
            console.error(error.message);
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
        } catch (error) {
            console.error('Erro ao buscar dados do CEP:', error);
            alert('Houve um erro ao buscar o CEP. Tente novamente mais tarde.');
        }
    };

    return (
        <main>
            <div className="tela-cadastro">
                <form onSubmit={handleSubmit(addUser)}>
                    <h1>Cadastro usuário</h1>

                    <label htmlFor="nome">Nome</label>
                    <input
                        id="nome"
                        placeholder="Digite o nome do usuário"
                        {...register('nome', { required: 'O nome é obrigatório' })}
                    />

                    <label htmlFor="sexo">Sexo</label>
                    <select id="sexo" {...register('sexo', { required: 'O sexo é obrigatório' })}>
                        <option value=""></option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                    </select>

                    <label htmlFor="cpf">CPF</label>
                    <input
                        id="cpf"
                        type="number"
                        {...register('cpf', { required: 'O CPF é obrigatório' })}
                    />

                    <label htmlFor="data_nascimento">Data de nascimento</label>
                    <input
                        id="data_nascimento"
                        type="date"
                        {...register('data_nascimento', { required: 'A data de nascimento é obrigatória' })}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', { required: 'O email é obrigatório' })}
                    />

                    <label htmlFor="senha">Senha</label>
                    <input
                        id="senha"
                        type="password"
                        {...register('senha', { required: 'A senha é obrigatória' })}
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

                    <button type="submit">Cadastrar</button>
                    <p>Já possui cadastro? <Link to={-1}>Efetuar login</Link></p>
                </form>
            </div>
        </main>
    );
}
