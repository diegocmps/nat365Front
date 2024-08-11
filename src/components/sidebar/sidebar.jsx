// src/components/SideBar.jsx
import { Link } from "react-router-dom";
import './sidebar.css';
import { useAuth } from "../../contexts/auth";
import { LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

function SideBar() {
    const { signOut } = useAuth();
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
                    <img className="logo" src="/src/assets/imagens/logo.png" alt="logo" />
                </div>
                <Link to="/dashboard" onClick={handleLinkClick}>Home</Link>
                <Link to="/dashboard/user/:id" onClick={handleLinkClick}>Dados Cadastrais</Link>
                <Link to="/dashboard/localidade" onClick={handleLinkClick}>Cadastro Locais</Link>
                <Link to="/dashboard/list" onClick={handleLinkClick}>Lista de Locais</Link>
                <div className="logout-container">
                    <button className="btn btn-dark" onClick={signOut}>
                        <LogOut size={16} />
                        <span className="logout-text">Sair</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default SideBar;
