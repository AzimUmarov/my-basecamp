import React, {useContext} from 'react';
import UserCredentialsContext from "../../../context/Credentials/UserCredentialsContext";
import {Navigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ServiceAPI from "../../../API/ServiceAPI";

function Profile({logout}) {
    const {setUserCredentials, userCredentials} = useContext(UserCredentialsContext)
    if(logout){
        setUserCredentials(null);
        return (
            <Navigate to="/" />
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {
            email: data.get("email"),
            password: userCredentials.user.password,
            name: data.get("lastName") + " " + data.get("firstName"),
            _id: userCredentials.user._id,
        };
        const object = {
            token: userCredentials.token,
            user
        }
        setUserCredentials(object);
        try {
            const response = await ServiceAPI.put(`/user/edit/${userCredentials?.user._id}`, JSON.stringify(user));
            // window.location.href = "/";
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div>
            <h1>Profile edit:</h1>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Update
                </Button>
            </Box>
        </div>
    );
}

export default Profile;
