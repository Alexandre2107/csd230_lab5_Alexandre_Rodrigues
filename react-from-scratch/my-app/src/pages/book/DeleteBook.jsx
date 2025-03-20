import React, { useState } from 'react';
import axios from 'axios';

// --- DeleteBook Component ---
function DeleteBook({ bookId, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setIsDeleting(true);
        setError(null);

        try {
            await axios.delete(`http://localhost:8080/rest/book/${bookId}`);
            onDelete(); // Call the parent component's onDelete function to refresh the list
        } catch (err) {
            setError(err.message || `Failed to delete book with ID ${bookId}.`);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Book'}
        </button>
    );
} export default DeleteBook