import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth";
import { Link, Navigate } from "react-router-dom";
import './list.css';
import { Trash2 } from 'lucide-react';

export function List() {
    const { user } = useAuth();
    const [lista, setLista] = useState([]);

    async function carregarDados() {
        try {
            const resposta = await fetch('http://localhost:3000/localidade?_expand=user');
            if (!resposta.ok) {
                throw new Error('Falha ao carregar dados');
            }
            setLista(await resposta.json());
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }

    async function excluirItem(id) {
        if (window.confirm('Tem certeza de que deseja excluir este item?')) {
            try {
                const resposta = await fetch(`http://localhost:3000/localidade/${id}`, {
                    method: 'DELETE'
                });

                if (resposta.ok) {
                    setLista(lista.filter(item => item.id !== id));
                    alert('Item excluído com sucesso');
                } else {
                    throw new Error('Falha ao excluir item');
                }
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
            <table className="styled-table">
                <thead>
                    <tr>
                        <td>Local</td>
                        <td>Descrição</td>
                        <td>Usuário</td>
                        <td>Opções</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        lista.map((item) => (
                            <tr key={item.id}>
                                <td data-label="Local"><Link to={`/localidade/detalhes/${item.id}`}>
                                    {item.local}
                                </Link></td>
                                <td data-label="Descrição">{item.descricao}</td>
                                <td data-label="Usuário" >{item.usuario || 'Desconhecido'}</td>
                                <td data-label="Opções" className="campo-opcoes">
                                    <Link to={`/localidade/${item.id}`}>Editar</Link>
                                    <Trash2
                                        onClick={() => excluirItem(item.id, item.usuarioId)}
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
