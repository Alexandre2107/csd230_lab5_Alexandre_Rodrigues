import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Checkbox, Button, Grid } from '@mui/material';
import axios from 'axios';

function DiscMagList({ onSelect, discMagsUpdated }) {
    const [discMags, setDiscMags] = useState([]);
    const [selectedDiscMags, setSelectedDiscMags] = useState([]);

    useEffect(() => {
        const fetchDiscMags = async () => {
            try {
                const response = await axios.get('http://localhost:8080/rest/discMag');
                setDiscMags(response.data);
            } catch (err) {
                console.error('Failed to fetch discMags:', err);
            }
        };

        fetchDiscMags();
    }, [discMagsUpdated]);

    const handleSelect = (id) => {
        setSelectedDiscMags((prev) =>
            prev.includes(id) ? prev.filter((discMagId) => discMagId !== id) : [...prev, id]
        );
    };

    const handleDeleteSelected = async () => {
        try {
            await Promise.all(
                selectedDiscMags.map((id) => axios.delete(`http://localhost:8080/rest/discMag/${id}`))
            );
            setDiscMags((prev) => prev.filter((discMag) => !selectedDiscMags.includes(discMag.id)));
            setSelectedDiscMags([]);
        } catch (err) {
            console.error('Failed to delete selected discMags:', err);
        }
    };

    const handleAddToCart = async () => {
        try {
            const cartId = 1; // Replace with the actual cart ID
            await Promise.all(
                selectedDiscMags.map((id) => {
                    const discMag = discMags.find((dm) => dm.id === id); // Find the DiscMag details
                    return axios.post(`http://localhost:8080/rest/cartItem?cartId=${cartId}`, {
                        description: discMag.description,
                        price: discMag.price,
                        quantity: 1,
                    });
                })
            );
            alert('Selected DiscMags added to cart!');
            setSelectedDiscMags([]); // Clear the selection, but keep the list
        } catch (err) {
            console.error('Failed to add selected DiscMags to cart:', err);
        }
    };

    return (
        <div>
            <Grid container spacing={2}>
                {discMags.map((discMag) => (
                    <Grid item xs={12} key={discMag.id}>
                        <Card onClick={() => onSelect(discMag.id)} style={{ cursor: 'pointer' }}>
                            <CardContent>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Checkbox
                                            checked={selectedDiscMags.includes(discMag.id)}
                                            onChange={() => handleSelect(discMag.id)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6">{discMag.title}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <div style={{ marginTop: '10px' }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDeleteSelected}
                    disabled={selectedDiscMags.length === 0}
                >
                    Delete Selected
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}
                    style={{ marginLeft: '10px' }}
                    disabled={selectedDiscMags.length === 0}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}

export default DiscMagList;