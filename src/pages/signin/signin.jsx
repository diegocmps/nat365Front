import { Link, useNavigate } from 'react-router-dom';
import './signin.css';
import { useAuth } from '../../contexts/auth';
import { useForm } from 'react-hook-form';

export function Signin() {
    const { signIn } = useAuth();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    async function onSubmit(data) {
        try {
            if (!data.email || !data.password) {
                alert('Preencha todos os campos');
                return;
            }

            const isSuccess = await signIn(data);

            if (isSuccess) {
                navigate('/dashboard');
            } else {
                alert('Email/senha inválidas');
            }
        } catch (error) {
            alert('Ocorreu um erro ao efetuar o login');
        }
    }

    return (
        <div className='login-page'>
            <div className='image-container'>
                <img src="./src/assets/imagens/imagem.jpg" alt="Imagem de fundo" />
            </div>
            <div className='login-container'>
                <img className='logo' src="./src/assets/imagens/logo.png" alt="logo" />
                <div className='login-area'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Efetuar login</h1>
                        <div>
                            <label htmlFor="floatingInput">Email</label>
                            <input
                                type="email"
                                id="floatingInput"
                                placeholder="nome@exemplo.com"
                                {...register('email')}
                            />
                        </div>
                        <div>
                            <label htmlFor="floatingPassword">Senha</label>
                            <input
                                type="password"
                                id="floatingPassword"
                                placeholder="Senha"
                                {...register('password')}
                            />
                        </div>
                        <button type="submit">Entrar</button>
                        <p>
                            Não possui cadastro? <Link to="/cadastro">Cadastre-se</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
