import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
<<<<<<< HEAD
import api from '../../utils/useAxios';
=======
import { api } from '../../utils/api';
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
import { getCepData } from '../../services/CepService/CepService';
import { useAuth } from '../../contexts/auth';
import './EditUserProfile.css';

export function EditUserProfile() {
    const { id: userId } = useParams();
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user, signIn } = useAuth();

    useEffect(() => {
        async function fetchUserData() {
            try {
<<<<<<< HEAD
                const response = await api.get(`/usuario/${userId}`);
                if (response.status === 200) {
                    setFormData(response.data);
=======
                const response = await api(`/users/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                } else {
                    setError('Erro ao buscar dados do usuário');
                }
            } catch (err) {
                setError('Erro ao buscar dados do usuário');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, [userId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
<<<<<<< HEAD
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCepBlur = async () => {
        if (formData?.cep) {
            try {
                const data = await getCepData(formData.cep);
                setFormData(prevData => ({
                    ...prevData,
                    rua: data.address,
                    bairro: data.district || '',
                    cidade: data.city,
                    estado: data.state
=======

        if (name.startsWith('endereco.')) {
            const key = name.split('.')[1];
            setFormData(prevData => ({
                ...prevData,
                endereco: {
                    ...prevData.endereco,
                    [key]: value
                }
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleCepBlur = async () => {
        if (formData.endereco?.cep) {
            try {
                const data = await getCepData(formData.endereco.cep);
                console.log("Dados do CEP recebidos:", data);
                setFormData(prevData => ({
                    ...prevData,
                    endereco: {
                        ...prevData.endereco,
                        rua: data.address,
                        bairro: data.district || '',
                        cidade: data.city,
                        estado: data.state
                    }
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                }));
            } catch (err) {
                alert('Erro ao buscar dados do CEP');
            }
        }
    };
<<<<<<< HEAD
=======
    
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
<<<<<<< HEAD
            const response = await api.put(`/usuario/${userId}`, formData);
            if (response.status === 200) {
=======
            const response = await api(`/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                alert('Dados alterados com sucesso!');
                if (user && user.id === userId) {
                    const updatedUser = { ...user, ...formData };
                    localStorage.setItem('@natureza365:user', JSON.stringify(updatedUser));
                    signIn({ email: user.email, password: user.password });
                }
<<<<<<< HEAD
                navigate(`/user/${userId}`);
=======
                navigate(`/dashboard/user/${userId}`);
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
            } else {
                setError('Erro ao atualizar dados do usuário');
            }
        } catch (err) {
            setError('Erro ao atualizar dados do usuário');
            console.error(err);
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="edit-user-profile">
<<<<<<< HEAD
=======
            <button type="submit" className="save-button" onClick={handleSubmit}>
                Salvar Alterações
            </button>
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
            <h1>Editar Perfil</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input
                        type="text"
                        name="nome"
                        value={formData?.nome || ''}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label htmlFor="sexo">
                    Sexo:
                    <select
                        name="sexo"
                        id='sexo'
                        value={formData?.sexo || ''}
                        onChange={handleChange}
                        required
                    >
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                    </select>
                </label>
<<<<<<< HEAD
                <label className="disabled-field">
=======
                <label>
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                    CPF:
                    <input
                        type="text"
                        name="cpf"
                        value={formData?.cpf || ''}
                        onChange={handleChange}
<<<<<<< HEAD
                        readOnly
=======
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                        required
                    />
                </label>
                <label>
                    Data de Nascimento:
                    <input
                        type="date"
                        name="data_nascimento"
<<<<<<< HEAD
                        value={formData?.data_nascimento ? new Date(formData.data_nascimento).toISOString().split('T')[0] : ''}
=======
                        value={formData?.data_nascimento || ''}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                        onChange={handleChange}
                        required
                    />
                </label>
<<<<<<< HEAD

                <label className="disabled-field">
=======
                <label>
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData?.email || ''}
                        onChange={handleChange}
<<<<<<< HEAD
                        readOnly
=======
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                        required
                    />
                </label>
                <label>
                    CEP:
                    <input
                        type="text"
<<<<<<< HEAD
                        name="cep"
                        value={formData?.cep || ''}
=======
                        name="endereco.cep"
                        value={formData?.endereco?.cep || ''}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                        onChange={handleChange}
                        onBlur={handleCepBlur}
                        required
                    />
                </label>
                <label>
                    Rua:
                    <input
                        type="text"
<<<<<<< HEAD
                        name="rua"
                        value={formData?.rua || ''}
=======
                        name="endereco.rua"
                        value={formData?.endereco?.rua || ''}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
<<<<<<< HEAD
                    Número:
                    <input
                        type="text"
                        name="numero"
                        value={formData?.numero || ''}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Complemento:
                    <input
                        type="text"
                        name="complemento"
                        value={formData?.complemento || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Bairro:
                    <input
                        type="text"
                        name="bairro"
                        value={formData?.bairro || ''}
=======
                    Bairro:
                    <input
                        type="text"
                        name="endereco.bairro"
                        value={formData?.endereco?.bairro || ''}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Cidade:
                    <input
                        type="text"
<<<<<<< HEAD
                        name="cidade"
                        value={formData?.cidade || ''}
=======
                        name="endereco.cidade"
                        value={formData?.endereco?.cidade || ''}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Estado:
                    <input
                        type="text"
<<<<<<< HEAD
                        name="estado"
                        value={formData?.estado || ''}
=======
                        name="endereco.estado"
                        value={formData?.endereco?.estado || ''}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                        onChange={handleChange}
                        required
                    />
                </label>
<<<<<<< HEAD
                <button type="submit" className="save-button">Salvar Alterações</button>
=======
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
            </form>
        </div>
    );
}
