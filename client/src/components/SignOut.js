import React from 'react'
import { Link } from 'react-router-dom'

function SignOut() {
    return (
        <div>
            <h1>You are Logged Out</h1>
            <h1>Thank You for Visiting</h1>
            <div>
                <Link to="/">Login</Link>
            </div>
        </div>
    )
}

export default SignOut