import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TopNavigation from './TopNavigation';

function Home() {

    let loc = useLocation();
    let navigate = useNavigate();

    let deleteUser = async () => {
        let reqOptions = {
            method: "DELETE"
        }

        let url = `http://localhost:6677/deleteUser?id=${loc.state._id}`;
        console.log(url);

        let JSONData = await fetch(url, reqOptions);
        let JSOData = await JSONData.json();

        if (JSOData.status == "Success") {
            navigate("/");
        }
        console.log(JSOData);
    }

    return (
        <div>
            <h1>Welcome Home</h1>
            {/* Details[] frm Server->Login Page->through Navigate{state:..} -> Receiving with help of useLocation */}
            <h1>{loc.state.firstName} {loc.state.lastName}</h1>

            <img src={`http://localhost:6677/${loc.state.profilePic}`}></img>


            <div>
                <button id='homeBtn' type="button"
                    onClick={() => {
                        localStorage.clear();
                        navigate("/signout");
                    }}>Log Out</button>

                <button id='homeBtn' type="button"
                    onClick={() => {
                        navigate("/edit", { state: loc.state });
                    }}>Edit Details</button>

                <TopNavigation />

                <button id='homeBtn' type="button"
                    onClick={() => {
                        deleteUser();
                    }}>Delete Account</button>
            </div>
        </div>
    )
}

export default Home