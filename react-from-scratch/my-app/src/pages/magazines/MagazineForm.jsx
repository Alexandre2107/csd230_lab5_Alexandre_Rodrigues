import { useState } from 'react';
import axios from 'axios';

function MagazineForm({ onSubmit, initialValues }) {
    const [formData, setFormData] = useState(initialValues || { title: '', currIssue: '', description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

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
            setFormData({ title: '', currIssue: '', description: '' });
        } catch (err) {
            setError(err.message || 'Failed to submit magazine.');
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
                <label htmlFor="currIssue">Current Issue:</label>
                <input type="text" id="currIssue" name="currIssue" value={formData.currIssue} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : initialValues ? 'Update Magazine' : 'Add Magazine'}
            </button>
        </form>
    );
}

export default MagazineForm;