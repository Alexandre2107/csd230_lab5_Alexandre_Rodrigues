import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

function DeleteTicket({ ticketId, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await axios.delete(`http://localhost:8080/rest/ticket/${ticketId}`);
            onDelete();
        } catch (err) {
            console.error('Failed to delete ticket:', err);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Button
            variant="contained"
            color="secondary"
            onClick={handleDelete}
            disabled={isDeleting}
        >
            {isDeleting ? 'Deleting...' : 'Delete Ticket'}
        </Button>
    );
}

export default DeleteTicket;