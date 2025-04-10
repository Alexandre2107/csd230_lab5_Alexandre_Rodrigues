import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Checkbox, Button, Grid } from '@mui/material';
import axios from 'axios';
import magazine from "./Magazine.jsx";

function MagazineList({ onSelect, magazinesUpdated }) {
    const [magazines, setMagazines] = useState([]);
    const [selectedMagazines, setSelectedMagazines] = useState([]);

    useEffect(() => {
        const fetchMagazines = async () => {
            try {
                const response = await axios.get('http://localhost:8080/rest/magazine');
                setMagazines(response.data);
            } catch (err) {
                console.error('Failed to fetch magazines:', err);
            }
        };

        fetchMagazines();
    }, [magazinesUpdated]);

    const handleSelect = (id) => {
        setSelectedMagazines((prev) =>
            prev.includes(id) ? prev.filter((magazineId) => magazineId !== id) : [...prev, id]
        );
    };

    const handleDeleteSelected = async () => {
        try {
            await Promise.all(
                selectedMagazines.map((id) => axios.delete(`http://localhost:8080/rest/magazine/${id}`))
            );
            setMagazines((prev) => prev.filter((magazine) => !selectedMagazines.includes(magazine.id)));
            setSelectedMagazines([]);
        } catch (err) {
            console.error('Failed to delete selected magazines:', err);
        }
    };

    const handleAddToCart = async () => {
        try {
            const cartId = 1; // Replace with the actual cart ID
            await Promise.all(
                selectedMagazines.map((id) => {
                    const magazine = magazines.find((m) => m.id === id); // Find the book details
                    return axios.post(`http://localhost:8080/rest/cartItem?cartId=${cartId}`, {
                        description: magazine.description, // Use the book title as the description
                        price: magazine.price, // Use the book price
                        quantity: 1, // Default quantity
                    });
                })
            );
            alert('Selected books added to cart!');
            setSelectedMagazines([]);
        } catch (err) {
            console.error('Failed to add selected books to cart:', err);
        }
    };

    return (
        <div>
            <Grid container spacing={2}>
                {magazines.map((magazine) => (
                    <Grid item xs={12} key={magazine.id}>
                        <Card onClick={() => onSelect(magazine.id)} style={{ cursor: 'pointer' }}>
                            <CardContent>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Checkbox
                                            checked={selectedMagazines.includes(magazine.id)}
                                            onChange={() => handleSelect(magazine.id)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6">{magazine.title}</Typography>
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
                    disabled={selectedMagazines.length === 0}
                >
                    Delete Selected
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}
                    style={{ marginLeft: '10px' }}
                    disabled={selectedMagazines.length === 0}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}

export default MagazineList;