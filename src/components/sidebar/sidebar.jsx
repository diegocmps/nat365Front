// src/components/SideBar.jsx
import { Link } from "react-router-dom";
import './sidebar.css';
import { useAuth } from "../../contexts/auth";
import { LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import logoImage from '../../assets/imagens/logo.png';

function SideBar() {
    const { user, signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle Sidebar">
                <Menu size={24} />
            </button>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="logo-container">
                    <img className="logo" src={logoImage} alt="logo" />
                </div>
                <Link to="/" onClick={handleLinkClick}>Home</Link>

                {/* Exibir links de Login e Cadastro somente se o usuário não estiver logado */}
                {!user && (
                    <>
                        <Link to="/cadastro" onClick={handleLinkClick}>Cadastro</Link>
                        <Link to="/login" onClick={handleLinkClick}>Login</Link>
                    </>
                )}

                {/* Links dinâmicos para os dados cadastrais do usuário logado */}
                {user && (
                    <>
                        <Link to={`/user/${user.id}`} onClick={handleLinkClick}>
                            Dados Cadastrais
                        </Link>
                        <Link to="/localidade" onClick={handleLinkClick}>
                            Cadastro Locais
                        </Link>
                        <Link to="/list" onClick={handleLinkClick}>
                            Lista de Locais
                        </Link>
                    </>
                )}

                <div className="logout-container">
                    {user ? (
                        <button className="btn btn-dark" onClick={signOut}>
                            <LogOut size={16} />
                            <span className="logout-text">Sair</span>
                        </button>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default SideBar;
