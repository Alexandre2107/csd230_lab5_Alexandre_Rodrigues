import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import axios from 'axios';

function DeleteDiscMag({ discMagId, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setIsDeleting(true);
        setError(null);

        try {
            await axios.delete(`http://localhost:8080/rest/discMag/${discMagId}`);
            onDelete();
        } catch (err) {
            setError(err.message || `Failed to delete discMag with ID ${discMagId}.`);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
                disabled={isDeleting}
            >
                {isDeleting ? 'Deleting...' : 'Delete DiscMag'}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
        </div>
    );
}

export default DeleteDiscMag;