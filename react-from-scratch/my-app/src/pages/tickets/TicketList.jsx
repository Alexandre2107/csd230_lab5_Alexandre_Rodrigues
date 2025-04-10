import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Checkbox, Button, Grid } from '@mui/material';
import axios from 'axios';

function TicketList({ onSelect, ticketsUpdated }) {
    const [tickets, setTickets] = useState([]);
    const [selectedTickets, setSelectedTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('http://localhost:8080/rest/ticket');
                setTickets(response.data);
            } catch (err) {
                console.error('Failed to fetch tickets:', err);
            }
        };

        fetchTickets();
    }, [ticketsUpdated]);

    const handleSelect = (id) => {
        setSelectedTickets((prev) =>
            prev.includes(id) ? prev.filter((ticketId) => ticketId !== id) : [...prev, id]
        );
    };

    const handleDeleteSelected = async () => {
        try {
            await Promise.all(
                selectedTickets.map((id) => axios.delete(`http://localhost:8080/rest/ticket/${id}`))
            );
            setTickets((prev) => prev.filter((ticket) => !selectedTickets.includes(ticket.id)));
            setSelectedTickets([]);
        } catch (err) {
            console.error('Failed to delete selected tickets:', err);
        }
    };

    const handleAddToCart = async () => {
        try {
            const cartId = 1; // Replace with the actual cart ID
            await Promise.all(
                selectedTickets.map((id) => {
                    const ticket = tickets.find((t) => t.id === id); // Find the book details
                    return axios.post(`http://localhost:8080/rest/cartItem?cartId=${cartId}`, {
                        description: ticket.description, // Use the book title as the description
                        price: ticket.price, // Use the book price
                        quantity: 1, // Default quantity
                    });
                })
            );
            alert('Selected books added to cart!');
            setSelectedTickets([]);
        } catch (err) {
            console.error('Failed to add selected books to cart:', err);
        }
    };

    return (
        <div>
            <Grid container spacing={2}>
                {tickets.map((ticket) => (
                    <Grid item xs={12} key={ticket.id}>
                        <Card onClick={() => onSelect(ticket.id)} style={{ cursor: 'pointer' }}>
                            <CardContent>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Checkbox
                                            checked={selectedTickets.includes(ticket.id)}
                                            onChange={() => handleSelect(ticket.id)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6">{ticket.text}</Typography>
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
                    disabled={selectedTickets.length === 0}
                >
                    Delete Selected
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}
                    style={{ marginLeft: '10px' }}
                    disabled={selectedTickets.length === 0}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}

export default TicketList;