import React from 'react';

function Content({title,description,assignedTo}) {
    return (
        <div className="ticket">
            <h3>{title}</h3>
            <p>{description}</p>
            <p><strong>Zugewiesen an:</strong> {assignedTo}</p>
        </div>

    );
}

export default Content;
