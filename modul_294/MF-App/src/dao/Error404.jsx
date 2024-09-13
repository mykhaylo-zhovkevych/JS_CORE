import React from 'react';
import { Link } from 'react-router-dom';
import './Error404.css';

function Error404() {
    return (
        <div className="not-found">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/hp" className="home-button">Go to Home Page</Link>
        </div>
    );
};
export default Error404;
