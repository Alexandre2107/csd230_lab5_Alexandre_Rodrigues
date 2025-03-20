import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MagazineList({ onSelect }) {
    const [magazines, setMagazines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMagazines = async () => {
            try {
                const response = await axios.get('http://localhost:8080/rest/magazine');
                setMagazines(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch magazines.');
                setLoading(false);
            }
        };

        fetchMagazines();
    }, []);

    if (loading) return <p>Loading magazines...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul>
            {magazines.map(magazine => (
                <li key={magazine.id} onClick={() => onSelect(magazine.id)}>
                    {magazine.title} (Issue: {magazine.currIssue})
                </li>
            ))}
        </ul>
    );
}

export default MagazineList;