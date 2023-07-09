import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/image/logo192.png";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = (props) => {
    const location = useLocation();
    const navigation = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigation("/")
        toast.success("logout successfully");
    }

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
                        <Nav className="me-auto">
                            <NavLink to="/" className="nav-link">
                                Home
                            </NavLink>
                            <NavLink to="/users" className="nav-link">
                                Manage Users
                            </NavLink>
                        </Nav>
                        <Nav>
                            <NavDropdown
                                title="More Option"
                                id="basic-nav-dropdown"
                            >
                                <NavLink to="/login" className="nav-link">
                                    Login
                                </NavLink>
                                <NavLink onClick={() => handleLogout() } className="nav-link">
                                    Logout
                                </NavLink>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
