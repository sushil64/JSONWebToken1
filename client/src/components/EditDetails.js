import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Login from './Login';

function EditDetails() {

    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let contactNoInputRef = useRef();
    let profilePicInputRef = useRef();
    // let usernameInputRef = useRef();

    let [profilePic, setProfilePic] = useState("/images/default.jpeg");

    let loc = useLocation();

    useEffect(() => {
        // usernameInputRef.current.value = loc.state.username;
        firstNameInputRef.current.value = loc.state.firstName;
        lastNameInputRef.current.value = loc.state.lastName;
        ageInputRef.current.value = loc.state.age;
        emailInputRef.current.value = loc.state.email;
        contactNoInputRef.current.value = loc.state.contactNo;
    }, []);

    let edit = async () => {

        let dataToUpdate = new FormData();
        dataToUpdate.append("id", loc.state._id);

        // dataToUpdate.append("username", usernameInputRef.current.value);
        dataToUpdate.append("firstName", firstNameInputRef.current.value);
        dataToUpdate.append("lastName", lastNameInputRef.current.value);
        dataToUpdate.append("age", ageInputRef.current.value);
        dataToUpdate.append("email", emailInputRef.current.value);
        dataToUpdate.append("contactNo", contactNoInputRef.current.value);
        dataToUpdate.append("profilePic", profilePicInputRef.current.files[0]);

        let reqOptions = {
            method: "PUT",
            body: dataToUpdate,
        };

        let JSONData = await fetch("http://localhost:6677/edit", reqOptions);

        let JSOData = await JSONData.json();

        console.log(JSOData);
        // console.log(res.json);

    };
    console.log(loc.state);



    return (
        <div>
            <h2>Edit Details</h2>
            <form>
                {/* <div>
                    <label>Username:</label>
                    <input ref={usernameInputRef}
                        placeholder='Enter Username'></input>
                </div>
                <div>
                    <label>Password:</label>
                    <input ref={passwordInputRef}
                        placeholder='Enter Password'></input>
                </div> */}
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
                            console.log(profilePicInputRef.current.files)

                        }}
                    ></input>
                </div>
                <div>
                    <img id="choosePic" src={profilePic} ></img>
                </div>

                <div>
                    <button type='button'
                        onClick={() => {
                            edit();
                        }}
                    >Submit</button>
                </div>
            </form>
            <div>
                <Link to="/">Login Page</Link>

            </div>
        </div>
    )
}

export default EditDetails
