import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

function DeleteMagazine({ magazineId, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await axios.delete(`http://localhost:8080/rest/magazine/${magazineId}`);
            onDelete();
        } catch (err) {
            console.error('Failed to delete magazine:', err);
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
            {isDeleting ? 'Deleting...' : 'Delete Magazine'}
        </Button>
    );
}

export default DeleteMagazine;