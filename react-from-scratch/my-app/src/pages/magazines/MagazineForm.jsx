import { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';

function MagazineForm({ onSubmit, initialValues }) {
    const [formData, setFormData] = useState({ title: '', currIssue: '', price: '', quantity: '', description: '' });
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
            const url = initialValues?.id ? `http://localhost:8080/rest/magazine/${initialValues.id}` : 'http://localhost:8080/rest/magazine';
            const method = initialValues?.id ? 'put' : 'post';

            const response = await axios[method](url, formData);
            onSubmit(response.data);
            setFormData({ title: '', currIssue: '', price: '', quantity: '', description: '' });
        } catch (err) {
            setError(err.message || 'Failed to submit magazine.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
                {initialValues ? 'Edit Magazine' : 'Add Magazine'}
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
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
                        {isSubmitting ? 'Submitting...' : initialValues ? 'Update Magazine' : 'Add Magazine'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default MagazineForm;