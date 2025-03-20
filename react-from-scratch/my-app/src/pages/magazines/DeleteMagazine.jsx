import React, { useState } from 'react';
import axios from 'axios';

function DeleteMagazine({ magazineId, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setIsDeleting(true);
        setError(null);

        try {
            await axios.delete(`http://localhost:8080/rest/magazine/${magazineId}`);
            onDelete();
        } catch (err) {
            setError(err.message || `Failed to delete magazine with ID ${magazineId}.`);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Magazine'}
        </button>
    );
}

export default DeleteMagazine;