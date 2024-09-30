import { Link, useNavigate } from 'react-router-dom';
import './signin.css';
import { useAuth } from '../../contexts/auth';
import { useForm } from 'react-hook-form';
import fundoImage from '../../assets/imagens/imagem.jpg'
import logoImage from '../../assets/imagens/logo.png'

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
                navigate('/');
            } else {
                alert('Email/senha inválidos');
            }
        } catch (error) {
            alert('Ocorreu um erro ao efetuar o login');
            console.error('Error during sign in process:', error);
        }
    }

    return (
        <div className='login-page'>
            <div className='image-container'>
                <img src={fundoImage} alt="Imagem de fundo" />
            </div>
            <div className='login-container'>
                <img className='logo' src={logoImage} alt="logo" />
                <div className='login-area'>
                    <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                        <h1>Efetuar login</h1>
                        <div>
                            <label htmlFor="floatingInput">Email</label>
                            <input
                                type="email"
                                id="floatingInput"
                                placeholder="nome@exemplo.com"
                                {...register('email', { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="floatingPassword">Senha</label>
                            <input
                                type="password"
                                id="floatingPassword"
                                placeholder="Senha"
                                {...register('password', { required: true })}
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
