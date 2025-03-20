import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DiscMagList({ onSelect }) {
    const [discMags, setDiscMags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDiscMags = async () => {
            try {
                const response = await axios.get('http://localhost:8080/rest/discMag');
                setDiscMags(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch discMags.');
                setLoading(false);
            }
        };

        fetchDiscMags();
    }, []);

    if (loading) return <p>Loading discMags...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul>
            {discMags.map(discMag => (
                <li key={discMag.id} onClick={() => onSelect(discMag.id)}>
                    {discMag.title} (Has Disc: {discMag.hasDisc ? 'Yes' : 'No'})
                </li>
            ))}
        </ul>
    );
}

export default DiscMagList;