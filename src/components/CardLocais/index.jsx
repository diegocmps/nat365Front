import './cardLocais.css';
import { MapPin } from 'lucide-react';

export function CardLocais({ localCount }) {

    return (
        <div className="card-locais">
            <span>Locais cadastrados: </span>
            <p>{localCount}</p>
            <MapPin />
        </div>
    );
}
