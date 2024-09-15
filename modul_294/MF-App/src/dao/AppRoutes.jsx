import { Routes, Route } from "react-router-dom";
import User from "../components/User";
import Content from "../components/Content";
import Board from "../components/Board";
import Statistic from "../components/Statistic";
import SupportIssues from "../components/SupportIssues";
import HomePage from "../components/HomePage";
import Error404 from "./Error404";
import CreateUser from "../components/CreateUser"; // Importiere die Komponente

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Board />}>
        <Route path="/" element={<Error404 />} />
        <Route path="hp" element={<HomePage />} />
        <Route path="user" element={<User />} />
        <Route path="content" element={<Content />} />
        <Route path="statistic" element={<Statistic />} />
        <Route path="si" element={<SupportIssues />} />
        
        {/* Füge hier die Route für CreateUser hinzu */}
        <Route path="create-user" element={<CreateUser />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
