import { Link, useNavigate } from "react-router-dom"; 
import './sidebar.css';
import { useAuth } from "../../contexts/auth";
import { LogOut, Menu, UserCog, MapPinPlusInside, MapPin } from 'lucide-react';
import { useState } from 'react';
import logoImage from '../../assets/imagens/logo.png';

function SideBar() {
    const { user, signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); 

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    const handleClick = (path) => {
        navigate(path);
        window.location.reload();
    };

    const handleLogout = async () => {
        await signOut();
        handleClick('/');
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
                <Link to="/" onClick={() => handleClick('/')} className="sidebar-link"> {}
                    Home
                </Link>

                {!user && (
                    <>
                        <Link to="/login" onClick={handleLinkClick}>Login</Link>
                    </>
                )}

                {user && (
                    <>
                        <Link to={`/user/${user.id}`} onClick={handleLinkClick}>
                            <UserCog size={20} /> Dados Cadastrais
                        </Link>
                        <Link to="/localidade" onClick={handleLinkClick}>
                            <MapPinPlusInside size={20} /> Cadastrar Locais
                        </Link>
                        <Link to="/list" onClick={handleLinkClick}>
                            <MapPin size={20} /> Meus Locais
                        </Link>
                    </>
                )}

                <div className="logout-container">
                    {user ? (
                        <button className="btn btn-dark" onClick={handleLogout}>
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