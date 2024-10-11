import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth";
import { Link, Navigate } from "react-router-dom";
import './list.css';
import { Trash2 } from 'lucide-react';
import api from '../../utils/useAxios';
import boneco3 from '../../assets/imagens/boneco3.png';

export function List() {
    const { user } = useAuth();
    const [lista, setLista] = useState([]);

    async function carregarDados() {
        try {
            const resposta = await api.get('/local?_expand=user');
            const dados = resposta.data;

            const locaisDoUsuario = dados.filter(item => item.usuarioId === user.id);
            setLista(locaisDoUsuario);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }

    async function excluirItem(id) {
        if (window.confirm('Tem certeza de que deseja excluir este item?')) {
            try {
                await api.delete(`/local/${id}`);
                setLista(lista.filter(item => item.id !== id));
                alert('Item excluído com sucesso');
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
                <img className="boneco3" src={boneco3} alt="logo"/> 
            <table className="styled-table">
                <thead>
            
                    <tr>
                        <td>Local</td>
                        <td>Descrição</td>
                        <td>Localização</td> 
                        <td>Opções</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        lista.map((item) => (
                            <tr key={item.id}>
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
