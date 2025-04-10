import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import BookList from './BookList.jsx';
import BookDetail from './BookDetail.jsx';
import BookForm from './BookForm.jsx';
import axios from 'axios';

function Book() {
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [booksUpdated, setBooksUpdated] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleBookSelect = (id) => {
        setSelectedBookId(id);
    };

    const handleBooksUpdated = () => {
        setBooksUpdated(!booksUpdated);
        setSelectedBookId(null); // Reset selected book after update
    };

    useEffect(() => {
        const fetchSelectedBook = async () => {
            if (selectedBookId) {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:8080/rest/book/${selectedBookId}`);
                    setSelectedBook(response.data);
                } catch (err) {
                    console.error('Failed to fetch selected book:', err);
                } finally {
                    setLoading(false);
                }
            } else {
                setSelectedBook(null);
            }
        };

        fetchSelectedBook();
    }, [selectedBookId]);

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Book Management
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6">Book List</Typography>
                    <BookList onSelect={handleBookSelect} booksUpdated={booksUpdated} />
                </Grid>
                <Grid item xs={12} md={8}>
                    {selectedBookId ? (
                        <>
                            <Typography variant="h6">Book Details</Typography>
                            {loading ? (
                                <Typography>Loading...</Typography>
                            ) : (
                                <BookDetail bookId={selectedBookId} onBooksUpdated={handleBooksUpdated} />
                            )}
                            <Typography variant="h6" style={{ marginTop: '20px' }}>
                                Edit Book
                            </Typography>
                            <BookForm
                                initialValues={selectedBook}
                                onSubmit={handleBooksUpdated}
                            />
                        </>
                    ) : (
                        <Typography variant="body1">Select a book to view details or edit.</Typography>
                    )}
                </Grid>
            </Grid>
            <div style={{ marginTop: '20px' }}>
                <Typography variant="h6">Add New Book</Typography>
                <BookForm onSubmit={handleBooksUpdated} />
            </div>
        </div>
    );
}

export default Book;