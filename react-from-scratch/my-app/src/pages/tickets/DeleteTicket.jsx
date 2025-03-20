import React, { useState } from 'react';
import axios from 'axios';

function DeleteTicket({ ticketId, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setIsDeleting(true);
        setError(null);

        try {
            await axios.delete(`http://localhost:8080/rest/ticket/${ticketId}`);
            onDelete();
        } catch (err) {
            setError(err.message || `Failed to delete ticket with ID ${ticketId}.`);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Ticket'}
        </button>
    );
}

export default DeleteTicket;