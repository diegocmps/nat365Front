// src/components/SideBar.jsx
import { Link } from "react-router-dom";
import './sidebar.css';
import { useAuth } from "../../contexts/auth";
import { LogOut } from 'lucide-react';

function SideBar() {
    const { signOut } = useAuth();

    return (
        <>
            <div className="sidebar">
                <legend>MENU</legend>
                <Link to="/dashboard">Home</Link>
                <Link to="/dashboard/localidade">Cadastro Locais</Link>
                <Link to="/dashboard/list">Lista de Locais</Link>
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
