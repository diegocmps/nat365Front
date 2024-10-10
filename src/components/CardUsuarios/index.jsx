import './cardUsuarios.css';
import { Users } from 'lucide-react';

export function CardUsuarios({ userCount }) {

    return (
<div className="card-usuarios">
    <span className="card-usuarios-text">Usuários ativos:</span>
    <div className="card-usuarios-content">
        <Users className="card-usuarios-icon" /> 
        <p className="card-usuarios-count">{userCount}</p> 
    </div>
</div>

    );
}
