import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DiscMagDetail({ discMagId }) {
    const [discMag, setDiscMag] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDiscMag = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/rest/discMag/${discMagId}`);
                setDiscMag(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || `Failed to fetch discMag with ID ${discMagId}.`);
                setLoading(false);
            }
        };

        if (discMagId) {
            fetchDiscMag();
        } else {
            setLoading(false);
        }
    }, [discMagId]);

    if (!discMagId) return <p>Please select a discMag to view details.</p>;
    if (loading) return <p>Loading discMag details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!discMag) return <p>DiscMag not found.</p>;

    return (
        <div>
            <h2>{discMag.title}</h2>
            <p>Has Disc: {discMag.hasDisc ? 'Yes' : 'No'}</p>
            <p>Description: {discMag.description}</p>
        </div>
    );
}

export default DiscMagDetail;