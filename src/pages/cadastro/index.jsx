import { Link, useNavigate } from "react-router-dom"
import styles from './styles.module.css'
import { useForm } from "react-hook-form"
import { api } from "../../utils/api"



export function CadastroPage() {

    const { register, handleSubmit, setValue } = useForm()
    const navigate = useNavigate()

    async function addUser(values) {

        try {
            const resposta = await api('/users', {
                method: 'post',
                body: JSON.stringify(values)
            })

            if (resposta.ok === false) {

                alert('Houve um erro ao cadastrar o usuário')

            } else {
                alert('Cadastrado com sucesso')
                navigate('/login')
            }

        } catch (error) {
            alert('Houve um erro ao cadastrar o usuário')
        }
    }

    const checkCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        console.log(cep);
        fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
            console.log(data);
            setValue('endereco.rua', data.logradouro)
            setValue('endereco.bairro', data.bairro)
            setValue('endereco.cidade', data.localidade)
            setValue('endereco.estado', data.uf)

        })
    }

    return (
        <main className={styles.container}>
            <div className={styles.formSignin}>

                <form className="formulario" onSubmit={handleSubmit(addUser)}>

                    <label htmlFor="nome">Nome</label>
                    <input
                        id="nome"
                        placeholder="Digite o nome do usuário"
                        {...register('nome', { required: 'O nome é obrigatório' })}
                    />

                    <select id="sexo" {...register('sexo', { required: 'O sexo é obrigatório' })}>
                        <option value=""></option>
                        <option value="masculino">masculino</option>
                        <option value="feminino">feminino</option>
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
                        name=""
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

                    <button className="btn btn-primary w-100 py-2" type="submit">Cadastrar</button>
                    <p>Já possui cadastro ? <Link to={-1}>Efetuar login</Link></p>
                </form>
            </div>

        </main>
    )
}