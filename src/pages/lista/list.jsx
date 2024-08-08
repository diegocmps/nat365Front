import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth";
import { Link, Navigate } from "react-router-dom";
import './list.css';
import { Trash2 } from 'lucide-react';

export function List() {
    const { user } = useAuth();
    const [lista, setLista] = useState([]);

    // Função para carregar dados
    async function carregarDados() {
        try {
            const resposta = await fetch('http://localhost:3000/localidade');
            if (!resposta.ok) {
                throw new Error('Falha ao carregar dados');
            }
            setLista(await resposta.json());
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }

    // Função para excluir um item
    async function excluirItem(id, usuarioId) {
        if (user.id !== usuarioId) {
            alert('Você não tem permissão para excluir este item.');
            return;
        }

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

    // Carregar dados ao montar o componente
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
                        <td>Opções</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        lista.map((item) => (
                            <tr key={item.id}>
                                <td data-label="Local"><Link to={`/dashboard/localidade/detalhes/${item.id}`}>
                                    {item.local}
                                </Link></td>
                                <td data-label="Descrição">{item.descricao}</td>
                                <td data-label="Opções" className="campo-opcoes">
                                    <Link to={`/dashboard/localidade/${item.id}`}>Editar</Link>
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
