import "./App.scss";
import Header from "./component/Header";
import TableUser from "./component/TableUser";
import Container from "react-bootstrap/Container";
import Login from "./component/Login";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./component/Home";
import { Link, Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext"

function App() {
    const { user, loginContext } = useContext(UserContext);
    console.log("check user context", user);

    useEffect(() => {
        if(localStorage.getItem("token")){
            loginContext(localStorage.getItem("token"), localStorage.getItem("token"))
        }
    }, [])
    return (
        <>
            <Header />
            <Container>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<TableUser/>} />
                    <Route path="/login" element={<Login/>} />
                </Routes>
            </Container>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
