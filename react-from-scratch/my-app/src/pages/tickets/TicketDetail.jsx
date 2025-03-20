import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TicketDetail({ ticketId }) {
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/rest/ticket/${ticketId}`);
                setTicket(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || `Failed to fetch ticket with ID ${ticketId}.`);
                setLoading(false);
            }
        };

        if (ticketId) {
            fetchTicket();
        } else {
            setLoading(false);
        }
    }, [ticketId]);

    if (!ticketId) return <p>Please select a ticket to view details.</p>;
    if (loading) return <p>Loading ticket details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!ticket) return <p>Ticket not found.</p>;

    return (
        <div>
            <h2>{ticket.text}</h2>
            <p>Price: {ticket.price}</p>
            <p>Quantity: {ticket.quantity}</p>
            <p>Description: {ticket.description}</p>
        </div>
    );
}

export default TicketDetail;