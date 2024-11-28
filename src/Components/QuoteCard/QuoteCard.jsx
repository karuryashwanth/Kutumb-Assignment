import React from 'react';
import './QuoteCard.css';

const QuoteCard = ({ quote }) => {
    return (
        <div className="quote-card">
            <div
                className="quote-image"
                style={{ backgroundImage: `url(${quote.mediaUrl})` }}
            >
                <div className="quote-text">{quote.text}</div>
            </div>
            <div className="quote-meta">
                <p className="username">By: {quote.username}</p>
                <p className="created-at">
                    {new Date(quote.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default QuoteCard;
