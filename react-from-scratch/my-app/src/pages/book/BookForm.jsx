import  { useState } from 'react';
import axios from 'axios';

// --- BookForm Component (Create/Update) ---
function BookForm({ onSubmit, initialValues }) {
    const [formData, setFormData] = useState(initialValues || { title: '', author: '', isbn: '' });
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
            const url = initialValues?.id ? `http://localhost:8080/rest/book/${initialValues.id}` : 'http://localhost:8080/rest/book';
            const method = initialValues?.id ? 'put' : 'post';

            const response = await axios[method](url, formData); // Use axios.post or axios.put dynamically
            onSubmit(response.data); // Call the parent component's onSubmit function
            setFormData({ title: '', author: '', isbn: '' }); // Clear form after successful submission
        } catch (err) {
            setError(err.message || 'Failed to submit book.');
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
                <label htmlFor="author">Author:</label>
                <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="isbn">ISBN:</label>
                <input type="text" id="isbn" name="isbn" value={formData.isbn} onChange={handleChange} />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : initialValues ? 'Update Book' : 'Add Book'}
            </button>
        </form>
    );
} export default BookForm;