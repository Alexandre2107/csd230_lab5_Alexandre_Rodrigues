import { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';

function TicketForm({ onSubmit, initialValues }) {
    const [formData, setFormData] = useState({ text: '', price: '', quantity: '', description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialValues) {
            setFormData(initialValues);
        }
    }, [initialValues]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const url = initialValues?.id ? `http://localhost:8080/rest/ticket/${initialValues.id}` : 'http://localhost:8080/rest/ticket';
            const method = initialValues?.id ? 'put' : 'post';

            const response = await axios[method](url, formData);
            onSubmit(response.data);
            setFormData({ text: '', price: '', quantity: '', description: '' });
        } catch (err) {
            setError(err.message || 'Failed to submit ticket.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
                {initialValues ? 'Edit Ticket' : 'Add Ticket'}
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Text"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Quantity"
                        name="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : initialValues ? 'Update Ticket' : 'Add Ticket'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default TicketForm;