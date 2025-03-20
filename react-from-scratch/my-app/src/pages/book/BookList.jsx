import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookList({ onSelect }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/rest/book');
                setBooks(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch books.');
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <p>Loading books...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul>
            {books.map(book => (
                <li key={book.id} onClick={() => onSelect(book.id)}>
                    {book.title} by {book.author} (ISBN: {book.isbn})
                </li>
            ))}
        </ul>
    );
}

export default BookList;