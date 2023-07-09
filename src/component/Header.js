import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/image/logo192.png";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const Header = (props) => {
    const { logoutContext, user } = useContext(UserContext);
    const [hideHeader, setHideHeader] = useState(false);

    const navigation = useNavigate();
    const handleLogout = () => {
        logoutContext();

        navigation("/");
        toast.success("logout successfully");
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={logoApp}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React-App-logo -BTD"
                        />
                        <span>React-App-BTD</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {(user && user.auth || window.location.pathname === "/" )&&
                            <>
                                <Nav className="me-auto">
                                    <NavLink to="/" className="nav-link">
                                        Home
                                    </NavLink>
                                    <NavLink to="/users" className="nav-link">
                                        Manage Users
                                    </NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.email && (
                                        <span className="nav-link">
                                            welcome: {user.email}{" "}
                                        </span>
                                    )}
                                    <NavDropdown
                                        title="More Option"
                                        id="basic-nav-dropdown"
                                    >
                                        {user && user.auth === true ? (
                                            <NavLink
                                                onClick={() => handleLogout()}
                                                className="nav-link"
                                            >
                                                Logout
                                            </NavLink>
                                        ) : (
                                            <NavLink
                                                to="/login"
                                                className="nav-link"
                                            >
                                                Login
                                            </NavLink>
                                        )}
                                    </NavDropdown>
                                </Nav>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
