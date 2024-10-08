import './cardUsuarios.css';
import { Users } from 'lucide-react';

export function CardUsuarios({ userCount }) {

    return (
        <div className="card-usuarios">
            <span className="card-usuarios-text">Usuários ativos:</span>
            <p className="card-usuarios-count">{userCount}</p>
            <Users className="card-usuarios-icon" />
        </div>
    );
}
