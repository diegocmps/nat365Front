import { Link, useNavigate } from 'react-router-dom'
import './signin.css'
import { useAuth } from '../../contexts/auth'
import { useForm } from 'react-hook-form'




export function Signin() {
    const { signIn } = useAuth()
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()


    async function onSubmit(data) {
        try {
        const isSuccess = await signIn(data)

        if(isSuccess) {
            //redirecionar o usuario para a aplicação
            navigate('/dashboard')
        } else {
            alert('Email/senha inválidas')
        }

        } catch (error) {

        }

    }


    return (
        <div className='login-page'>

            <div>
                <img src="./src/assets/imagens/imagem.jpg" alt="" />

            </div>

            <div className='login-area'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <h1 className="h3 mb-3 fw-normal">Efetuar login</h1>

                    <div className="form-floating">
                        <label htmlFor="floatingInput">Email</label>
<br />
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="nome@exemplo.com"
                            {...register('email')}
                        />
                    </div>
                    <div className="form-floating">
                        <label htmlFor="floatingPassword">Senha</label>
<br />
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Senha"
                            {...register('password')}
                        />
                    </div>

                    <div className="form-check text-start my-3">
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Entrar</button>
                    <p>
                        Não possui cadastro? <Link to="/cadastro">Cadastra-se</Link>
                    </p>
                </form>
            </div>


        </div>
    )
}