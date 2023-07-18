import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function TopNavigation() {

    let navigate = useNavigate();

    return (
        <div>

            <button id='homeBtn' type="button"
                onClick={() => {
                    navigate("/signup");
                }}>New Sign Up</button>

            <button id='homeBtn' type="button"
                onClick={() => {
                    navigate("/");
                }}>New Login</button>

        </div>
    )
}

export default TopNavigation