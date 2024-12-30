import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Grouping from "../components/Grouping";
import FunctionGraph from "../components/FunctionGraph";
import DataTable from "../components/DataTable";
import FileExplorer from "../components/FileExplorer/FileExplorer";
import ChartsPage from "../components/ChartsPage";

const Main = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" Component={Home}/>
                <Route exact path="/grouping" Component={Grouping}/>
                <Route exact path="/function-graph" Component={FunctionGraph}/>
                <Route exact path="/data-table" Component={DataTable}/>
                <Route exact path="/file-explorer" Component={FileExplorer}/>
                <Route exact path="/charts" Component={ChartsPage}/>
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </div>
    );
}
 
export default Main;