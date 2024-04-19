import React from 'react';
import BookPreview from './book-preview';

const BookList: React.FC = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <BookPreview />
            <BookPreview />
            <BookPreview />
            <BookPreview />
            <BookPreview />
            <BookPreview />
        </div>
    );
};

export default BookList;