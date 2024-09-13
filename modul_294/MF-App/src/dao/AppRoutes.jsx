import { Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import User from '../components/User';
import Content from '../components/Content';
import Board from '../components/Board';
import Statistic from "../components/Statistic.jsx";
import SupportIssues from "../components/SupportIssues.jsx";
import HomePage from '../components/HomePage.jsx';
import Error404 from './Error404.jsx';

const AppRoutes = () => {

    function RedirectToHome() {
        return <Navigate to="/hp" replace />;
      }

    return (
        <Routes>
            {/* Die Board-Komponente enthält das Outlet für verschachtelte Routen */}
            <Route path="/" element={<Board />}>

                <Route  path="/" element={<Error404 />}            />
                <Route path='hp' element={<HomePage />} />
                <Route path="user" element={<User />} />
                <Route path="content" element={<Content />} />

                <Route path="statistic" element={<Statistic />} />
                <Route path="si" element={<SupportIssues />} />


            </Route>
        </Routes>
    );
};

export default AppRoutes;
