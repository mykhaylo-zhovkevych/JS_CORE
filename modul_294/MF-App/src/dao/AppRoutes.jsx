import { Routes, Route } from 'react-router-dom';
import User from '../components/User';
import Content from '../components/Content';
import Board from '../components/Board';
import Statistic from "../components/Statistic.jsx";
import SupportIssues from "../components/SupportIssues.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Die Board-Komponente enthält das Outlet für verschachtelte Routen */}
            <Route path="/" element={<Board />}>

                <Route path="user" element={<User />} />
                <Route path="content" element={<Content />} />

                <Route path="statistic" element={<Statistic />} />
                <Route path="si" element={<SupportIssues />} />


            </Route>
        </Routes>
    );
};

export default AppRoutes;
