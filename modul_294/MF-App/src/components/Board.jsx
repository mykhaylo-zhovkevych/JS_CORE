import React from "react";
import { Outlet, Link } from "react-router-dom";

function Board() {
    return (
        <div className="container">
            <aside className="sidebar">
                <nav>
                    {/* Avatar und Name */}
                    <div style={{display: "flex", alignItems: "center"}}>
                        <img src="logo.png" alt="404" className="avatar"/>
                        <span>User Admin: Mykhaylo</span>
                    </div>

                    <br/>
                    <hr/>

                    {/* Horizontale Links */}
                    <div className="horizontal-links">
                        <Link to="/">Home Page</Link>
                        <Link to="/content">Agile Board</Link>
                        <Link to="/user">User</Link>
                        <Link to="/statistic">Statistic</Link>
                        <Link to="/si">Support & Issues</Link>
                    </div>
                </nav>
            </aside>

            <main className="board">
                <Outlet />
            </main>
        </div>
    );
}

export default Board;
