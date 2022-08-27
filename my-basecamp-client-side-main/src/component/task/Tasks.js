import React, {useState} from 'react';
import useFetchProjects from "../../hooks/FetchProjects";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import serviceAPI from "../../API/ServiceAPI";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ServiceAPI from "../../API/ServiceAPI";

function Tasks({project_id}) {
    const {data} = useFetchProjects(`/projects/${project_id}/tasks`);
    const navigate = useNavigate()
    const tasks = data?.data;
    async function handleAction(e, command, id){
        e.preventDefault();
        if(command === "delete"){
            try{
                const response = await serviceAPI.delete(`tasks/delete/${id}`);
                console.log( response?.data);
                window.location.href = window.location.href
            }
            catch(e){
                console.log(e)
            }
        }
        if(command === "create"){
            const data = new FormData(e.currentTarget);
            const object = {
                title:data.get("title")
            };
            try {
                const response = await ServiceAPI.post(`/projects/${project_id}/tasks/create`, JSON.stringify(object)).then(r => r).catch(e => e);
                console.log(response?.data);
                window.location.href = window.location.href;
            } catch (err) {
                console.error(err)
            }
        }
    }
    console.log(tasks)
    return (
        <div>
            <h3> Tasks:</h3>
            <Box component="form" noValidate onSubmit={(e) => handleAction(e, "create")} sx={{ mt: 3 }}>
                <Grid container spacing={0} sx={{width: {xs: "100%", md: "50%"}, display: "flex" }}>
                    <Grid item xs={12}>
                        <TextField
                            name="title"
                            label="task"
                            type="text"
                            id="title"
                            sx={{width: "76%"}}
                        />
                        <Button
                            type="submit"
                            align="center"
                            variant="contained"
                            sx={{ m: 1 }}
                        >
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Typography component="div" sx={{height: {md: 500, xs: 350},width: {xs: "100%", md: '50%'},overflowY: "scroll",  font:"16px/26px Georgia, Garamond, Serif"}}>
            {tasks?.map(task =>
                <Grid container spacing={6} sx={{width: {xs: "100%", md: "100%"}, m: 1, ml: 0, display: "flex" }}>
                    <Typography component="span" sx={{width: {md: "70%", xs: "70%"}, mt: {md: 1.3, xs: 1.3}, mr: {md: 5, xs: 3}}}>{task?.title || "name"}</Typography>
                    <Button onClick={() =>{navigate(`/task/edit/${task?._id}`)}}>
                    <AppRegistrationIcon sx={{m: 1}} />
                    </Button>
                    <Button>
                    <DeleteForeverIcon onClick={(e) => handleAction(e, "delete", task?._id)} sx={{m: 1 }} />
                    </Button>
                </Grid>
            )}
            </Typography>
        </div>
    );
}

export default Tasks;
