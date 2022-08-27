import React, {useContext} from 'react';
import ServiceAPI from "../../../API/ServiceAPI";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useParams} from "react-router-dom";
import userCredentialsContext from "../../../context/Credentials/UserCredentialsContext";

function EditPage({edit}) {
    const {currentProject} = useContext(userCredentialsContext);

    let { id } = useParams();
    const handleAction = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let object = {}
        if (edit === "discussion") {
            object = {
                title: data.get("title")
            };
        }
        if (edit === "message") {
            object = {
                message: data.get("title")
            };
        }
            try {
                const response = await ServiceAPI.put(`/${edit}/update/${id}`, JSON.stringify(object));
                console.log(response?.data);
                window.location.href = `/project/${currentProject?._id}`;
            } catch (err) {
                console.log(err)
            }
    }


    return (
        <Box component="form" noValidate onSubmit={handleAction} sx={{ mt: 3 }}>
            <Grid container spacing={0} sx={{width: {xs: "100%", md: "75%"}, display: "flex" }}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        name="title"
                        label={edit=== "message" ? "Message" : "Discussion title"}
                        type="text"
                        id="title"
                    />
                    <Button
                        type="submit"
                        align="center"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Update
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default EditPage;
