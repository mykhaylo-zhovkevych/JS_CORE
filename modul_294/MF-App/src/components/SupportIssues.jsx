import React from 'react';

function SupportIssues () {
    return (
        <div>
            <h1 className="Supportheadline"><b>Wilkommen auf der Support und Issue Seite</b></h1>
            <h2 className="Supportheadline">Anleitung zu erstellung eines Tags</h2>
                <div className="Supportlist">1.</div>
                <div className="Supportlist">2.</div>
                <div className="Supportlist">3.</div>
                <div className="Supportlist">4.</div>
                
            <div className="Support">Für weitere Fragen oder Porbleme können Sie entweder Florian Huber, oder Mykhaylo Zhovkevych fragen.</div>
            <h3 className="Supportheadline"><b>Impressum:</b></h3>

                <div className="Support">MF GmbH</div>
                <div className="Support">Oberer Graben 26</div>
                <img src="/Karte.jpg"/>
                <div className="Support">9000 St.Gallen</div>
        </div>
    );
}

export default SupportIssues;
