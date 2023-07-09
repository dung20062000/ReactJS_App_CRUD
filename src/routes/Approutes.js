import { Link, Route, Routes } from "react-router-dom";
import Login from "../component/Login";
import Home from "../component/Home";
import PrivateRoute from "./PrivateRoute";
import TableUser from "../component/TableUser";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                <Route
                    path="/users"
                    element={
                        <PrivateRoute path="/users">
                            <TableUser />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </>
    );
};
export default AppRoutes;
