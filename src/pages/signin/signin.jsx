import { Link, useNavigate } from 'react-router-dom';
import './signin.css';
import { useAuth } from '../../contexts/auth';
import { useForm } from 'react-hook-form';
<<<<<<< HEAD
import fundoImage from '../../assets/imagens/imagem.jpg';
import logoImage from '../../assets/imagens/logo2.png';

export function Signin() {
    const { signIn } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    async function onSubmit(data) {
        const { email, senha } = data;

        const success = await signIn({ email, password: senha });

        if (success) {
            navigate('/');
            console.log('Token armazenado:', localStorage.getItem('token'));
            
        } else {
            alert('Login falhou. Verifique suas credenciais e tente novamente.');
=======
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
                navigate('/dashboard');
            } else {
                alert('Email/senha inválidos');
            }
        } catch (error) {
            alert('Ocorreu um erro ao efetuar o login');
            console.error('Error during sign in process:', error);
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
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
<<<<<<< HEAD
                            {errors.email && <p>Email é obrigatório</p>}
=======
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                        </div>
                        <div>
                            <label htmlFor="floatingPassword">Senha</label>
                            <input
                                type="password"
                                id="floatingPassword"
<<<<<<< HEAD
                                placeholder="Digite sua senha"
                                {...register('senha', { required: true })}
                            />
                            {errors.senha && <p>Senha é obrigatória</p>}
=======
                                placeholder="Senha"
                                {...register('password', { required: true })}
                            />
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
