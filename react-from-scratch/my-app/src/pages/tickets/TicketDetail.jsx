import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

function TicketDetail({ ticketId, onTicketsUpdated }) {
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/rest/ticket/${ticketId}`);
                setTicket(response.data);
            } catch (err) {
                console.error('Failed to fetch ticket details:', err);
            }
        };

        if (ticketId) fetchTicket();
    }, [ticketId]);

    if (!ticket) return <Typography>Loading ticket details...</Typography>;

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{ticket.text}</Typography>
                <Typography>Price: ${ticket.price}</Typography>
                <Typography>Quantity: {ticket.quantity}</Typography>
                <Typography>Description: {ticket.description}</Typography>
            </CardContent>
        </Card>
    );
}

export default TicketDetail;