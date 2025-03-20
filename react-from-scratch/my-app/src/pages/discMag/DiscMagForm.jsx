
import { useState } from 'react';
import axios from 'axios';

function DiscMagForm({ onSubmit, initialValues }) {
    const [formData, setFormData] = useState(initialValues || { title: '', hasDisc: false, description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
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
            setFormData({ title: '', hasDisc: false, description: '' });
        } catch (err) {
            setError(err.message || 'Failed to submit discMag.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <div>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="hasDisc">Has Disc:</label>
                <input type="checkbox" id="hasDisc" name="hasDisc" checked={formData.hasDisc} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : initialValues ? 'Update DiscMag' : 'Add DiscMag'}
            </button>
        </form>
    );
}

export default DiscMagForm;