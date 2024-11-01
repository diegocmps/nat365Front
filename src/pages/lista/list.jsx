import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth";
import { Link, Navigate } from "react-router-dom";
import './list.css';
import { Trash2 } from 'lucide-react';
<<<<<<< HEAD
import api from '../../utils/useAxios';
import boneco3 from '../../assets/imagens/boneco3.png';
=======
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139

export function List() {
    const { user } = useAuth();
    const [lista, setLista] = useState([]);

    async function carregarDados() {
        try {
<<<<<<< HEAD
            const resposta = await api.get('/local?_expand=user');
            const dados = resposta.data;

            const locaisDoUsuario = dados.filter(item => item.usuarioId === user.id);
            setLista(locaisDoUsuario);
=======
            const resposta = await fetch('http://localhost:3000/localidade?_expand=user');
            if (!resposta.ok) {
                throw new Error('Falha ao carregar dados');
            }
            setLista(await resposta.json());
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }

    async function excluirItem(id) {
        if (window.confirm('Tem certeza de que deseja excluir este item?')) {
            try {
<<<<<<< HEAD
                await api.delete(`/local/${id}`);
                setLista(lista.filter(item => item.id !== id));
                alert('Item excluído com sucesso');
=======
                const resposta = await fetch(`http://localhost:3000/localidade/${id}`, {
                    method: 'DELETE'
                });

                if (resposta.ok) {
                    setLista(lista.filter(item => item.id !== id));
                    alert('Item excluído com sucesso');
                } else {
                    throw new Error('Falha ao excluir item');
                }
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
            } catch (error) {
                console.error('Erro ao excluir item:', error);
                alert('Erro ao excluir item. Tente novamente mais tarde.');
            }
        }
    }

    useEffect(() => {
        carregarDados();
    }, []);

    return user ? (
        <div className="local-list">
<<<<<<< HEAD
                <img className="boneco3" src={boneco3} alt="logo"/> 
            <table className="styled-table">
                <thead>
            
                    <tr>
                        <td>Local</td>
                        <td>Descrição</td>
                        <td>Localização</td> 
=======
            <table className="styled-table">
                <thead>
                    <tr>
                        <td>Local</td>
                        <td>Descrição</td>
                        <td>Usuário</td>
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                        <td>Opções</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        lista.map((item) => (
                            <tr key={item.id}>
<<<<<<< HEAD
                                <td data-label="Local">
                                    <Link to={`/localidade/detalhes/${item.id}`}>
                                        {item.nome}
                                    </Link>
                                </td>
                                <td data-label="Descrição">{item.descricao}</td>
                                <td data-label="Localização">
                                    <a href={`https://www.google.com/maps/?q=${item.latitude},${item.longitude}`} target="_blank" rel="noopener noreferrer">
                                        {item.cep}
                                    </a>
                                </td>
                                <td data-label="Opções" className="campo-opcoes">
                                    <Link to={`/localidade/${item.id}`}>Editar</Link>
                                    <Trash2
                                        onClick={() => excluirItem(item.id)}
=======
                                <td data-label="Local"><Link to={`/dashboard/localidade/detalhes/${item.id}`}>
                                    {item.local}
                                </Link></td>
                                <td data-label="Descrição">{item.descricao}</td>
                                <td data-label="Usuário" >{item.usuario || 'Desconhecido'}</td>
                                <td data-label="Opções" className="campo-opcoes">
                                    <Link to={`/dashboard/localidade/${item.id}`}>Editar</Link>
                                    <Trash2
                                        onClick={() => excluirItem(item.id, item.usuarioId)}
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
                                        className="btn-delete"
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    ) : <Navigate to="/" />;
}
