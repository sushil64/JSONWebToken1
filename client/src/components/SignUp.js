import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import Login from './Login';

function SignUp() {

    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let contactNoInputRef = useRef();
    let usernameInputRef = useRef();
    let passwordInputRef = useRef();
    let profilePicInputRef = useRef();

    let [profilePic, setProfilePic] = useState("/images/default.jpeg");

    let signUp = async () => {

        let dataToSend = new FormData();

        dataToSend.append("username", usernameInputRef.current.value);
        dataToSend.append("password", passwordInputRef.current.value);
        dataToSend.append("firstName", firstNameInputRef.current.value);
        dataToSend.append("lastName", lastNameInputRef.current.value);
        dataToSend.append("age", ageInputRef.current.value);
        dataToSend.append("email", emailInputRef.current.value);
        dataToSend.append("contactNo", contactNoInputRef.current.value);

        dataToSend.append("profilePic", profilePicInputRef.current.files[0]);


        let reqOptions = {
            method: "POST",
            body: dataToSend,
        };

        let JSONData = await fetch("http://localhost:6677/signup", reqOptions);

        let JSOData = await JSONData.json();

        console.log(JSOData);
    };

    return (
        <div>
            <h2>Sign Up Form</h2>
            <form>
                <div>
                    <label>Username:</label>
                    <input ref={usernameInputRef}
                        placeholder='Enter Username'></input>
                </div>
                <div>
                    <label>Password:</label>
                    <input ref={passwordInputRef}
                        placeholder='Enter Password'></input>
                </div>
                <div>
                    <label>First Name:</label>
                    <input ref={firstNameInputRef}
                        placeholder='Enter First Name'></input>
                </div>
                <div>
                    <label>Last Name:</label>
                    <input ref={lastNameInputRef}
                        placeholder='Enter Last Name'></input>
                </div>
                <div>
                    <label>Age:</label>
                    <input ref={ageInputRef}
                        placeholder='Enter Age'></input>
                </div>
                <div>
                    <label>Email:</label>
                    <input ref={emailInputRef}
                        placeholder='Enter Email'></input>
                </div>
                <div>
                    <label>Contact No:</label>
                    <input ref={contactNoInputRef}
                        placeholder='Enter Contact No'></input>
                </div>
                <div>
                    <label>Profile Pic:</label>
                    <input type='file' ref={profilePicInputRef}
                        onChange={() => {
                            let selectedFileURL = URL.createObjectURL(profilePicInputRef.current.files[0]);
                            setProfilePic(selectedFileURL);
                            console.log(profilePicInputRef.current.files);
                        }}
                    ></input>
                </div>
                <div>
                    <img id="choosePic" src={profilePic}></img>
                </div>
                <div>
                    <button type='button'
                        onClick={() => {
                            signUp();
                        }}
                    >Signup</button>
                </div>
            </form>
            <div>
                <Link to="/">Login</Link>

            </div>
        </div>
    )
}

export default SignUp
