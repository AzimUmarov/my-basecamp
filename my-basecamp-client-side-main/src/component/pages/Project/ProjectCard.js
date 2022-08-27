import * as React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Skeleton, useTheme} from "@mui/material";
import {useContext, useState} from "react";
import UserCredentialsContext from "../../../context/Credentials/UserCredentialsContext";
import useFetchProjects from "../../../hooks/FetchProjects";
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ServiceAPI from "../../../API/ServiceAPI";

export default function ProjectCard({project, visibility }) {
    const {userCredentials, setCurrentProject, setCreatorOfCurrentProject} = useContext(UserCredentialsContext);
    const theme = useTheme();
    const {data,loading} = useFetchProjects(`/user/${project?.creator_id}`);
    const navigate = useNavigate();

    async function handler(e, what){
        e.preventDefault();
        if(what){
            try {
                const response = await ServiceAPI.post(what, JSON.stringify({user: userCredentials.user}));
                console.log(response?.data);
                    window.location.href = window.location.href;
            } catch (err) {
                console.log(err);
            }
        }
        else {
            setCreatorOfCurrentProject(data.data);
            setCurrentProject(project);
            navigate(`/project/${project._id}`);
        }
    }
    if(loading)
        return (
            <Card sx={{ maxWidth: 400, minWidth: 400, m: 5}}>
                <Skeleton animation="wave" variant="rectangular" width={400} height={200} />
                <Skeleton variant="text" width={400} animation="wave"/>
            </Card>
        )

    if(visibility === "all" || (visibility === "shared") && project.creator_id !== userCredentials?.user?._id
        || visibility === "my-projects" && project.creator_id === userCredentials?.user?._id )
        return (
            <Card sx={{ maxWidth: 400, minWidth: 400, m: 5}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={ theme.palette.text.primary ===  "#fff"
                        ?  "https://findicons.com/files/icons/2779/simple_icons/2048/basecamp.png"
                        : "https://icon-library.com/images/base-camp-png--1024.png"}
                    alt="green iguana"
                    onClick={handler}
                />
                <CardContent onClick={handler}>
                    <Typography gutterBottom variant="h5" component="div">
                        {project.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div"  sx={{mb:1}}>
                        {data?.data?.name || "owner"}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        {project.description}
                    </Typography>
                </CardContent>
                <CardActions >
                    <Button size="small"  onClick={() => navigate(`/project/edit/${project?._id}`)} >Edit</Button>
                    <Button size="small" onClick={(e) => handler(e, `/projects/delete/${project?._id}`)} sx={{mr: 4}}>Delete</Button>
                    <Stack spacing={4} direction="row" sx={{ml:12}}>
                        <Badge badgeContent={project?.discussion?.length} color="secondary" >
                            <QuestionAnswerIcon color="action" />
                        </Badge>
                        <Badge badgeContent={project?.members?.length} color="success">
                            <PeopleAltIcon color="action" />
                        </Badge>
                    </Stack>
                </CardActions>
            </Card>
        );
}
