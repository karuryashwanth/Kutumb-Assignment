import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import QuotesList from './Components/QuoteList/QuoteList';
import CreateQuote from './Components/CreateQuote/CreateQuote';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/quotes" element={<QuotesList />} />
                <Route path="/create-quote" element={<CreateQuote />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;