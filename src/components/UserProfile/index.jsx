import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import { useAuth } from '../../contexts/auth';
import { api, fetchLocationsByUser } from '../../utils/api';



export function UserProfile() {
    const { user, signOut } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasLocations, setHasLocations] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            setError('Usuário não está logado');
            return;
        }

        setLoading(true);

        fetchLocationsByUser(user.nome).then(locations => {
            setHasLocations(locations.length > 0);
            setLoading(false);
        }).catch(() => {
            setError('Erro ao verificar locais do usuário');
            setLoading(false);
        });
    }, [user]);

    const handleEdit = () => {
        navigate(`/dashboard/user/editar/${user.id}`); 
    };

    const handleDelete = async () => {
        if (hasLocations) {
            alert('Não é possível excluir o usuário porque ele possui locais cadastrados.');
            return;
        }

        const confirmDelete = window.confirm('Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.');
        if (confirmDelete) {
            try {
                const response = await api(`/users/${user.id}`, { method: 'DELETE' });
                if (response.ok) {
                    signOut();
                    navigate('/');
                } else {
                    setError('Erro ao excluir o usuário');
                }
            } catch (err) {
                setError('Erro ao excluir o usuário');
                console.error(err);
            }
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="user-profile">
            {user ? (
                <div>
                    <h1>{user.nome}</h1>
                    <p><strong>Sexo:</strong> {user.sexo}</p>
                    <p><strong>CPF:</strong> {user.cpf}</p>
                    <p><strong>Data de Nascimento:</strong> {new Date(user.data_nascimento).toLocaleDateString()}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>CEP:</strong> {user.endereco.cep}</p>
                    <p><strong>Rua:</strong> {user.endereco.rua}</p>
                    <p><strong>Bairro:</strong> {user.endereco.bairro}</p>
                    <p><strong>Cidade:</strong> {user.endereco.cidade}</p>
                    <p><strong>Estado:</strong> {user.endereco.estado}</p>
                    <div className="user-profile-actions">
                        <button onClick={handleEdit} className="edit-button">Editar</button>
                        <button onClick={handleDelete} className="delete-button">Excluir</button>
                    </div>
                </div>
            ) : (
                <p>Usuário não encontrado</p>
            )}
        </div>
    );
}
