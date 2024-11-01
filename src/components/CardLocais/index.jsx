<<<<<<< HEAD
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
=======
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import './cardLocais.css';
import { MapPin } from 'lucide-react';

export function CardLocais() {
    const [localCount, setLocalCount] = useState(0);

    useEffect(() => {
        async function fetchLocalCount() {
            try {
                const response = await api('/localidade');
                const data = await response.json();
                setLocalCount(data.length);
            } catch (error) {
                console.error('Erro ao buscar a quantidade de locais:', error);
            }
        }

        fetchLocalCount();
    }, []);

    return (
        <div className="card-locais">
            <span>Locais cadastrados: </span>
            <p>{localCount}</p>
            <MapPin />
>>>>>>> 87c86f39a0c63ac7f31210525db6de0a42f48139
        </div>
    );
}
