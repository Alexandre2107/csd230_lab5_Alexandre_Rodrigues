import React, { useState } from 'react';
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
        <button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete DiscMag'}
        </button>
    );
}

export default DeleteDiscMag;