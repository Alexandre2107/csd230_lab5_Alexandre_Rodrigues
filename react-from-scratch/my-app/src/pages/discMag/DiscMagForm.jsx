import { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';

function DiscMagForm({ onSubmit, initialValues }) {
    const [formData, setFormData] = useState({ title: '', hasDisc: false, description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialValues) {
            setFormData(initialValues);
        }
    }, [initialValues]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value,  hasDisc: e.target.name === 'hasDisc' ? e.target.checked : formData.hasDisc });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const url = initialValues?.id ? `http://localhost:8080/rest/discMag/${initialValues.id}` : 'http://localhost:8080/rest/discMag';
            const method = initialValues?.id ? 'put' : 'post';

            const response = await axios[method](url, formData);
            onSubmit(response.data);

            // Reset formData, including the price field
            setFormData({ title: '', hasDisc: false, price: '', description: '' });
        } catch (err) {
            setError(err.message || 'Failed to submit discMag.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
                {initialValues ? 'Edit DiscMag' : 'Add DiscMag'}
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid>
                    <TextField
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid>
                    <Typography variant="body1">Has Disc</Typography>
                    <input
                        type="checkbox"
                        name="hasDisc"
                        checked={formData.hasDisc}
                        onChange={handleChange}
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
                        {isSubmitting ? 'Submitting...' : initialValues ? 'Update DiscMag' : 'Add DiscMag'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default DiscMagForm;