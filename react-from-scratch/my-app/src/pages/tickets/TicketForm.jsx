import { useState } from 'react';
import axios from 'axios';

function TicketForm({ onSubmit, initialValues }) {
    const [formData, setFormData] = useState(initialValues || { text: '', price: '', quantity: '', description: '' });
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
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <div>
                <label htmlFor="text">Text:</label>
                <input type="text" id="text" name="text" value={formData.text} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="quantity">Quantity:</label>
                <input type="text" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : initialValues ? 'Update Ticket' : 'Add Ticket'}
            </button>
        </form>
    );
}

export default TicketForm;