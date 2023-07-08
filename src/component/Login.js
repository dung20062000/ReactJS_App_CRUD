import { useState } from "react";
import "./Login.scss";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShoePassWord, setIsShoePassWord] = useState(false);
    return (
        <>
            <div className="login-container">
                <div className="login-body col-12 col-sm-4 ">
                    <div className="login-content">
                        <div className="login-title">Login</div>
                        <div className="text">Email or UserName</div>
                        <input
                            type="text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter email or username"
                        ></input>
                        <div className="container-pass">
                            <input
                                type={ isShoePassWord ===true ?"text" : "password"}
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                placeholder="Enter password"
                            ></input>
                            <i className="fa-solid fa-eye"></i>
                            <i 
                                className={isShoePassWord ===true ? "fa-solid fa-eye":"fa-solid fa-eye-slash" }
                                onClick={() => setIsShoePassWord(!isShoePassWord)}
                            ></i>
                        </div>
                        <button
                            className={
                                email && password
                                    ? "btn-login active"
                                    : "btn-login"
                            }
                            disabled={email && password
                                ? false
                                : true}
                        >
                            Login
                        </button>
                        <button className="btn-back">
                            <i class="fa-solid fa-chevron-left"></i>Go Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Login;
