import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    let userInputRef = useRef();
    let passInputRef = useRef();
    let navigate = useNavigate();

    // 1. Local Storage assignment with useEffect(get item)
    useEffect(() => {
        // userInputRef.current.value = localStorage.getItem("username");
        // passInputRef.current.value = localStorage.getItem("password");

        validateToken();

    });

    let validateCredentials = async () => {

        let dataToValidate = new FormData();

        dataToValidate.append("username", userInputRef.current.value);
        dataToValidate.append("password", passInputRef.current.value);

        let reqOptions = {
            method: "POST",
            body: dataToValidate,
        };

        let JSONData = await fetch("http://localhost:6677/validateLogin", reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);

        if (JSOData.isLoggedIn == false) {
            alert(JSOData.msg);
        } else {

            localStorage.setItem("token", JSOData.token);

            navigate("/home", { state: JSOData.details });
        }
    };

    let validateToken = async () => {

        let dataToValidate = new FormData();

        dataToValidate.append("token", localStorage.getItem("token"));

        let reqOptions = {
            method: "POST",
            body: dataToValidate,
        };

        let JSONData = await fetch("http://localhost:6677/validateToken", reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);

        if (JSOData.isLoggedIn == false) {
            alert(JSOData.msg);
        } else {

            localStorage.setItem("token", JSOData.token);

            navigate("/home", { state: JSOData.details });
        }
    };

    return (
        <div>
            <h1>Welcome</h1>
            <form>
                <div>
                    <label>Email:</label>
                    <input ref={userInputRef} placeholder='Enter Email id'></input>
                </div>
                <div>
                    <label>Password:</label>
                    <input ref={passInputRef} placeholder='Enter Password'></input>
                </div>
                <div>
                    <button type="button"
                        onClick={() => {
                            validateCredentials();
                        }}>Login</button>
                </div>
            </form>
            <div>
                <label>Not a Member:
                    <Link to="/signup">Pls Signup</Link>
                </label>
            </div>
        </div>


    )
}

export default Login