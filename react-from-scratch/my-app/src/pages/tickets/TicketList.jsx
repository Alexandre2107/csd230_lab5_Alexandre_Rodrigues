import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TicketList({ onSelect }) {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('http://localhost:8080/rest/ticket');
                setTickets(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch tickets.');
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    if (loading) return <p>Loading tickets...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul>
            {tickets.map(ticket => (
                <li key={ticket.id} onClick={() => onSelect(ticket.id)}>
                    {ticket.text} (Price: {ticket.price}, Quantity: {ticket.quantity})
                </li>
            ))}
        </ul>
    );
}

export default TicketList;