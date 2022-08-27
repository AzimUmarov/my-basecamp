import React, {useContext, useState} from 'react';
import {useParams} from "react-router-dom";
import userCredentialsContext from "../../../context/Credentials/UserCredentialsContext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ServiceAPI from "../../../API/ServiceAPI";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Typography from "@mui/material/Typography";
import {Divider} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function EditProject({command}) {
    let { id } = useParams();
    const {userCredentials, currentProject, setCurrentProject} = useContext(userCredentialsContext);

    const [body, setBody] = useState(currentProject?.members || []);
    const [admin, setAdmin] = useState(false);

    const handleAction = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const object = {
            title: data.get("title"),
            description: data.get("desc"),
            user: userCredentials?.user
        };
        try {
            let response;
            if(command ===  "New")
                response =  await ServiceAPI.post(`/projects/create`, JSON.stringify(object));
            else
                response =  await ServiceAPI.put(`/projects/update/${id}`, JSON.stringify(object));
            if(command ===  "New")
                window.location.href = "/";
            else
                window.location.href = window.location.href;
        } catch (err) {
            console.error(err);
        }
    }
    async function addUser(event, path, del){
        event.preventDefault();
        let data;
        let object;
        if(!del) {
            data = new FormData(event.currentTarget);

            const user = {
                email: data.get("title"),
                role: data.get("role") ? "admin" : "user",
                permissions: {
                    create: (data.get("role") === "on") || (data.get("create") === "on"),
                    read: (data.get("role") === "on") || (data.get("read") === "on"),
                    update: (data.get("role") === "on") || (data.get("update") === "on"),
                    delete: (data.get("role") === "on") || (data.get("delete") === "on")
                }
            }
            object = {user};
        }
        else {
            const user = {
                email: del
            }
            object = {user};
        }
        try {
            const res = await ServiceAPI.post(`/projects/${id}/get`, JSON.stringify({user: userCredentials.user}));
            setCurrentProject(res?.data);
            window.location.href = window.location.href;
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
            <div>{command} project</div>
            <Box component="form" noValidate onSubmit={handleAction} sx={{ mt: 3 }}>
                <Grid container spacing={0} sx={{width: {xs: "100%", md: "75%"}, display: "flex" }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="title"
                            label="title"
                            type="text"
                            id="title"
                            className="m-2"
                        />
                        <TextField
                            fullWidth
                            name="desc"
                            label="description"
                            type="text"
                            id="desc"
                            className="m-2"
                        />
                        <Button
                            type="submit"
                            align="center"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, ml: 1 }}

                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {command === "Edit" ?
            <>
            <h4>Members: </h4>
            <FormControl component="form" onSubmit={(e) => addUser(e, "addUser")} sx={{display: "flex"}}>
                <Grid container spacing={6} sx={{width: {xs: "100%", md: "100%"}, m: 1, ml: 0, display: "flex" }}>
                    <TextField
                        name="title"
                        label="Add member: email"
                        type="text"
                        id="title"
                        sx={{width: {md: "40%", xs: "100%"}, mr: {md: 4, xs: 2}}}
                    />
                    <FormControlLabel control={<Checkbox  name="role" onClick={() => setAdmin(!admin)} />} label="Admin" />
                    <FormControlLabel disabled={admin} control={<Checkbox name="create" defaultChecked={admin} />} label="read" />
                    <FormControlLabel disabled={admin} control={<Checkbox name="read" defaultChecked={admin} />} label="create" />
                    <FormControlLabel disabled={admin} control={<Checkbox name="update" defaultChecked={admin}/>} label="edit" />
                    <FormControlLabel disabled={admin}  control={<Checkbox name="delete" defaultChecked={admin} />} label="delete" />
                    <Button
                        type="submit"
                        align="flex-end"
                        sx={{mt: {xs: 2, md: 0}}}
                    >
                        <AddIcon/>
                    </Button>

                </Grid>
            </FormControl>
            <Divider/>
            {body.map((row) => (
                 <FormControl component="form" onSubmit={(e) => addUser(e, "addPermission")} sx={{display: "flex"}} >
                     <Grid container spacing={6} sx={{width: {xs: "100%", md: "100%"}, m: 1, ml: 0, display: "flex" }}>
                         <Typography component="span" sx={{width: {md: "35%", xs: "100%"}, mt: {md: 1.3, xs: 1.3}, mr: {md: 5, xs: 3}}}>{row?.email || "name"}</Typography>
                         <TextField
                             name="title"
                             type="text"
                             id="title"
                             value={row?.email}
                             sx={{width: "40%", mr: {md: 4, xs: 2}, display: "none"}}
                         />
                        <FormControlLabel control={<Checkbox name="role" defaultChecked={row.role === 'admin'}  />} label="Admin" />
                        <FormControlLabel  control={<Checkbox name="create" defaultChecked={row?.permissions?.read} />} label="read" />
                        <FormControlLabel  control={<Checkbox name="read" defaultChecked={row?.permissions?.create} />} label="create" />
                        <FormControlLabel  control={<Checkbox name="update" defaultChecked={row?.permissions?.update}/>} label="edit" />
                        <FormControlLabel  control={<Checkbox name="delete" defaultChecked={row?.permissions?.delete} />} label="delete" />
                        <Button
                            type="submit"
                            align="flex-end"
                        >
                            <AutorenewIcon />
                        </Button>
                         <Button onClick={(e) => addUser(e, "removeUser", row?.email)} >
                         <DeleteForeverIcon/>
                         </Button>
                     </Grid>
                </FormControl>
            ))}
            </> : null
            }
        </div>
    );
}

export default EditProject;
