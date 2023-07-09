import { Link, Route, Routes } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Alert } from "react-bootstrap"
// import TableUser from "../component/TableUser";

const PrivateRoute = (props) => {
    console.log("check props", props);
    const { logoutContext, user } = useContext(UserContext);

    if (user && !user.auth) {
        return (
            <>
                
                <Alert
                    variant="danger"
                    className="mt-3"
                >
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        you don't have permissom to access this route
                    </p>
                </Alert>
            </>
        );
    }

    return (
        <>
            {props.children}
        </>
    );
};
export default PrivateRoute;
