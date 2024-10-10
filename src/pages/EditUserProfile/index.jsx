import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/useAxios';
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
                const response = await api.get(`/usuario/${userId}`);
                if (response.status === 200) {
                    setFormData(response.data);
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
                }));
            } catch (err) {
                alert('Erro ao buscar dados do CEP');
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.put(`/usuario/${userId}`, formData);
            if (response.status === 200) {
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
                <label className="disabled-field">
                    CPF:
                    <input
                        type="text"
                        name="cpf"
                        value={formData?.cpf || ''}
                        onChange={handleChange}
                        readOnly
                        required
                    />
                </label>
                <label>
                    Data de Nascimento:
                    <input
                        type="date"
                        name="data_nascimento"
                        value={formData?.data_nascimento ? new Date(formData.data_nascimento).toISOString().split('T')[0] : ''}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label className="disabled-field">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData?.email || ''}
                        onChange={handleChange}
                        readOnly
                        required
                    />
                </label>
                <label>
                    CEP:
                    <input
                        type="text"
                        name="cep"
                        value={formData?.cep || ''}
                        onChange={handleChange}
                        onBlur={handleCepBlur}
                        required
                    />
                </label>
                <label>
                    Rua:
                    <input
                        type="text"
                        name="rua"
                        value={formData?.rua || ''}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
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
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Cidade:
                    <input
                        type="text"
                        name="cidade"
                        value={formData?.cidade || ''}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Estado:
                    <input
                        type="text"
                        name="estado"
                        value={formData?.estado || ''}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit" className="save-button">Salvar Alterações</button>
            </form>
        </div>
    );
}
