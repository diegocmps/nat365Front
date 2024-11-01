import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import { useAuth } from '../../contexts/auth';
import api from '../../utils/useAxios'; 

export function UserProfile() {
    const { user, signOut } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasLocations, setHasLocations] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            setError('Usuário não está logado');
            return;
        }

        setLoading(true);

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
    };

    const handleDelete = async () => {
        if (hasLocations) {
            alert('Não é possível excluir o usuário porque ele possui locais cadastrados.');
            return;
        }
    
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
                    
                } else {
                    setError('Erro ao excluir o usuário');
                }
            } catch (err) {
                
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError('Erro ao excluir o usuário');
                }
                console.error(err);
            } finally {
                setDeleting(false);
            }
        }
    };

    if (loading) return <p>Carregando...</p>;
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
                    </div>
                </div>
            ) : (
                <p>Usuário não encontrado</p>
            )}
        </div>
    );
}