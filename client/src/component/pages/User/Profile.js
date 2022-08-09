import React, {useContext} from 'react';
import UserCredentialsContext from "../../../context/Credentials/UserCredentialsContext";
import {Navigate} from "react-router-dom";

function Profile({logout}) {
    const {setUserCredentials} = useContext(UserCredentialsContext)
    if(logout){
        setUserCredentials(null);
        return (
            <Navigate to="/" />
        )
    }
    return (
        <div>
            <h1>profile edit</h1>
        </div>
    );
}

export default Profile;
