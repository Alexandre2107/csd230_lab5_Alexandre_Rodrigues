import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Checkbox, Button, Grid } from '@mui/material';
import axios from 'axios';

function BookList({ onSelect, booksUpdated }) {
    const [books, setBooks] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/rest/book');
                setBooks(response.data);
            } catch (err) {
                console.error('Failed to fetch books:', err);
            }
        };

        fetchBooks();
    }, [booksUpdated]);

    const handleSelect = (id) => {
        setSelectedBooks((prev) =>
            prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id]
        );
    };

    const handleDeleteSelected = async () => {
        try {
            await Promise.all(
                selectedBooks.map((id) => axios.delete(`http://localhost:8080/rest/book/${id}`))
            );
            setBooks((prev) => prev.filter((book) => !selectedBooks.includes(book.id)));
            setSelectedBooks([]);
        } catch (err) {
            console.error('Failed to delete selected books:', err);
        }
    };

    const handleAddToCart = async () => {
        try {
            const cartId = 1; // Replace with the actual cart ID
            await Promise.all(
                selectedBooks.map((id) => {
                    const book = books.find((b) => b.id === id); // Find the book details
                    return axios.post(`http://localhost:8080/rest/cartItem?cartId=${cartId}`, {
                        description: book.description, // Use the book title as the description
                        price: book.price, // Use the book price
                        quantity: 1, // Default quantity
                    });
                })
            );
            alert('Selected books added to cart!');
            setSelectedBooks([]);
        } catch (err) {
            console.error('Failed to add selected books to cart:', err);
        }
    };

    return (
        <div>
            <Grid container spacing={2}>
                {books.map((book) => (
                    <Grid item xs={12} key={book.id}>
                        <Card onClick={() => onSelect(book.id)} style={{ cursor: 'pointer' }}>
                            <CardContent>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Checkbox
                                            checked={selectedBooks.includes(book.id)}
                                            onChange={() => handleSelect(book.id)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6">{book.title}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <div style={{ marginTop: '10px' }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDeleteSelected}
                    disabled={selectedBooks.length === 0}
                >
                    Delete Selected
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}
                    style={{ marginLeft: '10px' }}
                    disabled={selectedBooks.length === 0}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}

export default BookList;