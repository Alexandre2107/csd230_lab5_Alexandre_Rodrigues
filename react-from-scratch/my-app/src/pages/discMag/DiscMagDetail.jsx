import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';

function DiscMagDetail({ discMagId, onDiscMagsUpdated }) {
    const [discMag, setDiscMag] = useState(null);

    useEffect(() => {
        const fetchDiscMag = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/rest/discMag/${discMagId}`);
                setDiscMag(response.data);
            } catch (err) {
                console.error('Failed to fetch discMag details:', err);
            }
        };

        if (discMagId) fetchDiscMag();
    }, [discMagId]);

    if (!discMag) return <Typography>Loading discMag details...</Typography>;

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{discMag.title}</Typography>
                <Typography variant="h5">{discMag.price}</Typography>
                <Typography>Has Disc: {discMag.hasDisc ? 'Yes' : 'No'}</Typography>
                <Typography>Description: {discMag.description}</Typography>
            </CardContent>
        </Card>
    );
}

export default DiscMagDetail;