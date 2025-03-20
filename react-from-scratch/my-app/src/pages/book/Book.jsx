import { useState } from 'react';
import BookList from './BookList.jsx';
import BookForm from './BookForm.jsx';
import BookDetail from './BookDetail.jsx';
import DeleteBook from './DeleteBook.jsx';

function Book() {
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [booksUpdated, setBooksUpdated] = useState(false);

    const handleBookSelect = (id) => {
        setSelectedBookId(id);
    };

    const handleBookSubmit = (newBook) => {
        setBooksUpdated(!booksUpdated);
    };

    const handleBookDelete = () => {
        setSelectedBookId(null);
        setBooksUpdated(!booksUpdated);
    };

    return (
        <div>
            <h1>Book Management</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '300px', marginRight: '20px' }}>
                    <h2>Book List</h2>
                    <BookList key={booksUpdated} onSelect={handleBookSelect} />
                </div>
                <div style={{ width: '400px', marginRight: '20px' }}>
                    <h2>Book Details</h2>
                    <BookDetail bookId={selectedBookId} />
                    {selectedBookId && <DeleteBook bookId={selectedBookId} onDelete={handleBookDelete} />}
                </div>
                <div style={{ width: '400px' }}>
                    <h2>Add/Update Book</h2>
                    <BookForm onSubmit={handleBookSubmit} initialValues={selectedBookId ? { id: selectedBookId } : null} />
                </div>
            </div>
        </div>
    );
}

export default Book;