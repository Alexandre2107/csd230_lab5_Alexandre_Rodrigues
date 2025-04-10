import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';

function MagazineDetail({ magazineId, onMagazinesUpdated }) {
    const [magazine, setMagazine] = useState(null);

    useEffect(() => {
        const fetchMagazine = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/rest/magazine/${magazineId}`);
                setMagazine(response.data);
            } catch (err) {
                console.error('Failed to fetch magazine details:', err);
            }
        };

        if (magazineId) fetchMagazine();
    }, [magazineId]);

    if (!magazine) return <Typography>Loading magazine details...</Typography>;

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{magazine.title}</Typography>
                <Typography>Price: ${magazine.price}</Typography>
                <Typography>Quantity: {magazine.quantity}</Typography>
                <Typography>Description: {magazine.description}</Typography>
            </CardContent>
        </Card>
    );
}

export default MagazineDetail;