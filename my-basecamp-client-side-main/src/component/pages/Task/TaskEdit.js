import React from 'react';
import useFetchProjects from "../../../hooks/FetchProjects";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate, useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ServiceAPI from "../../../API/ServiceAPI";

function Tasks(props) {
    const {id} = useParams();

    const {data} = useFetchProjects(`/tasks/${id}/subtasks`);
    const subTasks = data?.data;
    async function handleAction(e, command, _id){
        e.preventDefault();
        if(command === "delete"){
            try{
                const response = await ServiceAPI.delete(`subtasks/${_id}/delete`);
                window.location.href = window.location.href
            }
            catch(e){
                alert(e)
            }
        }
        if(command === "create"){
            const data = new FormData(e.currentTarget);
            const object = {
                title:data.get("title")
            };
            try {
                const response = await ServiceAPI.post(`/tasks/${id}/subtasks/create`, JSON.stringify(object));
                console.log(response?.data);
                window.location.href = window.location.href
            } catch (err) {
                console.error(err);
                // alert(err)
            }
        }
        if(command === "edit"){
            const data = new FormData(e.currentTarget);
            const object = {
                isFinished: true,
                title: data.get("title")
            }
            try {
                const response = await ServiceAPI.put(`/tasks/update/${id}`, JSON.stringify(object));
                window.location.href = window.location.href
            } catch (err) {
                console.error(err);
            }
        }
    }
    console.log(subTasks);
    return (
        <div>
            <Box component="form" noValidate onSubmit={(e) => handleAction(e, "edit")} sx={{ mt: 3 }}>
                <Grid container spacing={0} sx={{width: {xs: "100%", md: "50%"}, display: "flex" }}>
                    <Grid item xs={12}>
                        <TextField
                            name="title"
                            label="update: title"
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
                            update
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <h3> SubTasks:</h3>
            <Box component="form" noValidate onSubmit={(e) => handleAction(e, "create")} sx={{ mt: 3 }}>
                <Grid container spacing={0} sx={{width: {xs: "100%", md: "50%"}, display: "flex" }}>
                    <Grid item xs={12}>
                        <TextField
                            name="title"
                            label="title"
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
                {subTasks?.map(task =>
                    <Grid container spacing={6} sx={{width: {xs: "100%", md: "100%"}, m: 1, ml: 0, display: "flex" }}>
                        <Typography component="span" sx={{width: {md: "70%", xs: "70%"}, mt: {md: 1.3, xs: 1.3}, mr: {md: 5, xs: 3}}}>{task?.title || "name"}</Typography>
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
