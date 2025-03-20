import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- BookDetail Component ---
function BookDetail({ bookId }) {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/rest/book/${bookId}`);
                setBook(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || `Failed to fetch book with ID ${bookId}.`);
                setLoading(false);
            }
        };

        if (bookId) { // Only fetch if a bookId is provided
            fetchBook();
        } else {
            setLoading(false); // If no bookId, just set loading to false
        }
    }, [bookId]); // Effect runs when bookId changes

    if (!bookId) return <p>Please select a book to view details.</p>;
    if (loading) return <p>Loading book details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!book) return <p>Book not found.</p>;

    return (
        <div>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.isbn}</p>
        </div>
    );
}

export default BookDetail;