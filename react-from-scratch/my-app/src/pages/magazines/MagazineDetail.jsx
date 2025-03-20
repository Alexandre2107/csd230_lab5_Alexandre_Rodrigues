import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MagazineDetail({ magazineId }) {
    const [magazine, setMagazine] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMagazine = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/rest/magazine/${magazineId}`);
                setMagazine(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || `Failed to fetch magazine with ID ${magazineId}.`);
                setLoading(false);
            }
        };

        if (magazineId) {
            fetchMagazine();
        } else {
            setLoading(false);
        }
    }, [magazineId]);

    if (!magazineId) return <p>Please select a magazine to view details.</p>;
    if (loading) return <p>Loading magazine details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!magazine) return <p>Magazine not found.</p>;

    return (
        <div>
            <h2>{magazine.title}</h2>
            <p>Current Issue: {magazine.currIssue}</p>
            <p>Description: {magazine.description}</p>
        </div>
    );
}

export default MagazineDetail;