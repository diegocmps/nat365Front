import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../utils/api';
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
                const response = await api(`/users/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
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
                }));
            } catch (err) {
                alert('Erro ao buscar dados do CEP');
            }
        }
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api(`/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('Dados alterados com sucesso!');
                if (user && user.id === userId) {
                    const updatedUser = { ...user, ...formData };
                    localStorage.setItem('@natureza365:user', JSON.stringify(updatedUser));
                    signIn({ email: user.email, password: user.password });
                }
                navigate(`/user/${userId}`);
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
            <button type="submit" className="save-button" onClick={handleSubmit}>
                Salvar Alterações
            </button>
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
                <label>
                    CPF:
                    <input
                        type="text"
                        name="cpf"
                        value={formData?.cpf || ''}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Data de Nascimento:
                    <input
                        type="date"
                        name="data_nascimento"
                        value={formData?.data_nascimento || ''}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData?.email || ''}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    CEP:
                    <input
                        type="text"
                        name="endereco.cep"
                        value={formData?.endereco?.cep || ''}
                        onChange={handleChange}
                        onBlur={handleCepBlur}
                        required
                    />
                </label>
                <label>
                    Rua:
                    <input
                        type="text"
                        name="endereco.rua"
                        value={formData?.endereco?.rua || ''}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Bairro:
                    <input
                        type="text"
                        name="endereco.bairro"
                        value={formData?.endereco?.bairro || ''}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Cidade:
                    <input
                        type="text"
                        name="endereco.cidade"
                        value={formData?.endereco?.cidade || ''}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Estado:
                    <input
                        type="text"
                        name="endereco.estado"
                        value={formData?.endereco?.estado || ''}
                        onChange={handleChange}
                        required
                    />
                </label>
            </form>
        </div>
    );
}
