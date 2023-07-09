import { useEffect, useState, useContext } from "react";
import "./Login.scss";
import { loginApi } from "../service/UserService"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShoePassWord, setIsShoePassWord] = useState(false);
    const [showLoadingLogin, setShowLoadingLogin] = useState(false);

    const { loginContext } = useContext(UserContext);

    // useEffect(() => {
    //     let token = localStorage.getItem("token");
    //     if(token) {
    //         navigate("/")
    //     }
    // }, [])

    const handleLogin = async() => {
        setShowLoadingLogin(true)
        if( !email || !password ) {
            toast.error("please check your email and password")
            return;
        }
        let res = await loginApi(email, password)
        console.log("check res: ", res)
        if( res &&  res.token ){
            loginContext(email, res.token) 
            navigate("/")
        }else{
            //error
            if(res && res.status === 400){
                toast.error(res.data.error)
            }
        }
        setShowLoadingLogin(false)
    }
    const handleGoBack = () => {
        navigate("/")
    }
    return (
        <>
            <div className="login-container">
                <div className="login-body col-12 col-sm-4 ">
                    <div className="login-content">
                        <div className="login-title">Login</div>
                        <div className="text">Email or UserName (eve.holt@reqres.in)</div>
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
                                : true
                            }
                            onClick={() => handleLogin()}
                        >    
                           {showLoadingLogin && <i className="fas fa-spinner fa-pulse"></i>}  Login
                        </button>
                        <button className="btn-back">
                            <i className="fa-solid fa-chevron-left"></i>
                            <span onClick={() => handleGoBack() }>Go Back</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Login;
