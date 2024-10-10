import './cardLocais.css';
import { MapPin } from 'lucide-react';

export function CardLocais({ localCount }) {

    return (
        <div className="card-locais">
            <span className="card-locais-text">Locais cadastrados:</span>
            <div className="card-locais-content">
                <MapPin className="card-locais-icon" />
                <p className="card-locais-count">{localCount}</p>
            </div>
        </div>
    );
}
