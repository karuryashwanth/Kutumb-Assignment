import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuotes } from '../../services/api';
import QuoteCard from '../QuoteCard/QuoteCard';
import './QuoteList.css';

const QuoteList = () => {
    const [quotes, setQuotes] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/');
        } else {
            loadQuotes(page, token);
        }
    }, [page, navigate]);

    // Load quotes for the given page
    const loadQuotes = async (page, token) => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const limit = 10;
            const offset = (page - 1) * limit;
            const response = await fetchQuotes(limit, offset, token);

            console.log('Response from API:', response);

            if (response.length === 0) {
                setHasMore(false);
            } else {
                setQuotes((prevQuotes) => [...prevQuotes, ...response]);
            }
        } catch (error) {
            console.error('Failed to load quotes:', error);
        }
        setLoading(false);
    };

    const handleScroll = () => {
        if (loading || !hasMore) return;
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    const navigateToCreateQuote = () => {
        navigate('/create-quote');
    };

    return (
        <div className="quotes-page">
            <h1>Quotes</h1>
            <div className="quotes-list">
                {quotes.map((quote, index) => (
                    <QuoteCard key={index} quote={quote} />
                ))}
            </div>

            {loading && <p>Loading more quotes...</p>}
            <button className="floating-button" onClick={navigateToCreateQuote}>
                +
            </button>
        </div>
    );
};

export default QuoteList;
