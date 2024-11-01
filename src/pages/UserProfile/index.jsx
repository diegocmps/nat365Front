import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import { useAuth } from '../../contexts/auth';
<<<<<<< HEAD
import api from '../../utils/useAxios'; 
=======
import { api, fetchLocationsByUser } from '../../utils/api';


>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139

export function UserProfile() {
    const { user, signOut } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
<<<<<<< HEAD
    const [hasLocations, setHasLocations] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [deleting, setDeleting] = useState(false);
=======
    const [hasLocations, setHasLocations] = useState(false); 
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            setError('Usuário não está logado');
            return;
        }

        setLoading(true);

<<<<<<< HEAD
        async function fetchUserDetails() {
            try {
                const response = await api.get(`/usuario/${user.id}`);
                setUserDetails(response.data);
                setHasLocations(response.data.locais && response.data.locais.length > 0);
            } catch (err) {
                setError('Erro ao buscar detalhes do usuário');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchUserDetails();
    }, [user]);

    const handleEdit = () => {
        navigate(`/user/editar/${user.id}`);
=======
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
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
    };

    const handleDelete = async () => {
        if (hasLocations) {
            alert('Não é possível excluir o usuário porque ele possui locais cadastrados.');
            return;
        }
<<<<<<< HEAD
    
        const confirmDelete = window.confirm('Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.');
        if (confirmDelete) {
            setDeleting(true);
            try {
                const response = await api.delete(`/usuario/${user.id}`);
                if (response.status === 204) {
                    
                    console.log('Antes de remover:', localStorage.getItem('@natureza365:user'));
    
                    
                    localStorage.removeItem('@natureza365:user');
                    localStorage.removeItem('token');
    
                    // Log após remoção
                    console.log('Depois de remover:', localStorage.getItem('user'));
    
                    signOut(); 
                    navigate('/'); 
                    
=======

        const confirmDelete = window.confirm('Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.');
        if (confirmDelete) {
            try {
                const response = await api(`/users/${user.id}`, { method: 'DELETE' });
                if (response.ok) {
                    signOut();
                    navigate('/');
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                } else {
                    setError('Erro ao excluir o usuário');
                }
            } catch (err) {
<<<<<<< HEAD
                
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError('Erro ao excluir o usuário');
                }
                console.error(err);
            } finally {
                setDeleting(false);
=======
                setError('Erro ao excluir o usuário');
                console.error(err);
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
            }
        }
    };

    if (loading) return <p>Carregando...</p>;
<<<<<<< HEAD
    if (error) return <p className="error-message">{error}</p>; 

    return (
        <div className="user-profile">
            {userDetails ? (
                <div>
                    <h1>{userDetails.nome}</h1>
                    <p><strong>Sexo:</strong> {userDetails.sexo}</p>
                    <p><strong>CPF:</strong> {userDetails.cpf}</p>
                    <p><strong>Data de Nascimento:</strong> {new Date(userDetails.data_nascimento).toLocaleDateString()}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>CEP:</strong> {userDetails.cep}</p>
                    <p><strong>Rua:</strong> {userDetails.rua}</p>
                    <p><strong>Número:</strong> {userDetails.numero}</p>
                    <p><strong>Complemento:</strong> {userDetails.complemento ? userDetails.complemento : 'Não informado'}</p>
                    <p><strong>Bairro:</strong> {userDetails.bairro}</p>
                    <p><strong>Cidade:</strong> {userDetails.cidade}</p>
                    <p><strong>Estado:</strong> {userDetails.estado}</p>
                    <div className="user-profile-actions">
                        <button onClick={handleEdit} className="edit-button">Editar</button>
                        <button onClick={handleDelete} className="delete-button" disabled={deleting}>
                            {deleting ? 'Excluindo...' : 'Excluir'}
                        </button>
=======
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
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                    </div>
                </div>
            ) : (
                <p>Usuário não encontrado</p>
            )}
        </div>
    );
}
