import { Link, useNavigate } from 'react-router-dom';
import './signin.css';
import { useAuth } from '../../contexts/auth';
import { useForm } from 'react-hook-form';
import fundoImage from '../../assets/imagens/imagem.jpg';
import logoImage from '../../assets/imagens/logo.png';

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
                            {errors.email && <p>Email é obrigatório</p>}
                        </div>
                        <div>
                            <label htmlFor="floatingPassword">Senha</label>
                            <input
                                type="password"
                                id="floatingPassword"
                                placeholder="Senha"
                                {...register('senha', { required: true })}
                            />
                            {errors.senha && <p>Senha é obrigatória</p>}
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