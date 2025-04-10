import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';

function BookDetail({ bookId, onBooksUpdated }) {
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/rest/book/${bookId}`);
                setBook(response.data);
            } catch (err) {
                console.error('Failed to fetch book details:', err);
            }
        };

        if (bookId) fetchBook();
    }, [bookId]);


    if (!book) return <Typography>Loading book details...</Typography>;

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{book.title}</Typography>
                <Typography>Author: {book.author}</Typography>
                <Typography>Price: ${book.price}</Typography>
                <Typography>Quantity: {book.quantity}</Typography>
                <Typography>Description: {book.description}</Typography>
            </CardContent>
        </Card>
    );
}

export default BookDetail;