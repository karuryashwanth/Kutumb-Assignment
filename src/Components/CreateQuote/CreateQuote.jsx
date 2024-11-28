import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImage, createQuote } from '../../services/api'; // API service
import './CreateQuote.css';

const CreateQuote = () => {
    const [quoteText, setQuoteText] = useState('');
    const [image, setImage] = useState(null);
    const [mediaUrl, setMediaUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle image upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                setLoading(true);
                const response = await uploadImage(file);
                setMediaUrl(response?.[0]?.url); // Set mediaUrl after successful upload
                setError(''); // Clear any previous error
            } catch (error) {
                setError('Failed to upload image');
            } finally {
                setLoading(false);
            }
        }
    };

    // Handle quote submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (quoteText?.length === 0 || mediaUrl?.length === 0) {
            setError('Quote text and image are required');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('You must be logged in to submit a quote');
                return;
            }

            await createQuote(quoteText, mediaUrl, token);
            setQuoteText('');
            setImage(null);
            setMediaUrl('');
            setError('');
            alert('Quote submitted successfully!');
            navigate(-1); // Navigate back after successful submission
        } catch (err) {
            setError('Failed to create quote');
        }
    };

    return (
        <div className="create-quote-container">
            <div className="header">
                <button onClick={() => navigate(-1)} className="back-button">
                    Go Back
                </button>
                <h2>Create a Quote</h2>
            </div>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <textarea
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    placeholder="Enter your quote here"
                    rows="4"
                    required
                />
                <div className="image-upload">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        required
                    />
                    {loading && <p>Uploading...</p>}
                </div>
                {mediaUrl && <img src={mediaUrl} alt="Uploaded preview" className="image-preview" />}
                <button type="submit" className="submit-button">
                    Submit Quote
                </button>
            </form>
        </div>
    );
};

export default CreateQuote;
