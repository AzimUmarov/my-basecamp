import React, {useContext, useState} from 'react';
import { useNavigate, useParams} from "react-router-dom";
import UserCredentialsContext from "../../../context/Credentials/UserCredentialsContext";
import Typography from "@mui/material/Typography";
import CreateIcon from '@mui/icons-material/Create';
import { Divider } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DescriptionIcon from '@mui/icons-material/Description';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ServiceAPI from "../../../API/ServiceAPI";
import Discussions from "../../discussion/Discussions";
import Tasks from "../../task/Tasks";
import Attachments from "../../attachment/Attachments";
import Badge from "@mui/material/Badge";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

function ShowProject(props) {
    let { id } = useParams();
    let {userCredentials, currentProject, creatorOfCurrentProject, projects} = useContext(UserCredentialsContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    if(!Object.values((currentProject)))
        currentProject = projects.length && projects?.filter(item => item?._id === id)[0];


    const handleAction = async (event, what) => {
        event.preventDefault();
        let data;
        if(!what)
            data = new FormData(event.currentTarget);
        const object = {
            title: what || data.get("title"),
            user: userCredentials.user
        };
        try {
            setLoading(true);
            const response = await ServiceAPI.post(what || `/projects/${currentProject?._id}/discussion/create`, JSON.stringify(object));
            console.log(response?.data);
            if(what)
                window.location.href = "/my-projects";
            else
                window.location.href = window.location.href;
        } catch (err) {
            setLoading(false);
            console.error(err)
        }
    };


    function createData() {
        const rows = [];
        for(let i = 0; i < currentProject?.members.length; i++)
            rows.push({email: currentProject?.members[i].email,role: currentProject?.members[i].role});
        return rows;
    }

    const rows = createData();

    return (
        <div>
            <Typography
                variant="h4"
                align="center"
                sx={{
                    display: 'block',
                    fontFamily: 'Arial',
                    fontWeight: 700,
                    color: 'inherit'
                }}
            >
                {currentProject.title || "title"}
            </Typography>
            <Typography variant="subtitle0" color="text.secondary" component="div"  sx={{mb:1}} align="center" >
                <CreateIcon color="action" sx={{fontSize: "medium", mr: 1}}/>
                {creatorOfCurrentProject.name || "creator"}
            </Typography>
            <Divider/>
            <Typography variant="h6" color="text.primary" component="div"  sx={{mb:1, display: { xs: 'block', md: 'flex' }, mt: { xs: 1, md: 2 }}} align="center" >
                <DescriptionIcon color="action" sx={{fontSize: "medium", mr: 1, mt: { xs: 0, md: 1 }}}/>
                {currentProject.description || "title"}
            </Typography>
                <Table sx={{ minWidth: 300, maxWidth: 450, mt: {xs: 0, md: -5} }} align="right">
                    <TableHead>
                        <TableRow>
                            <TableCell>Members</TableCell>
                            <TableCell align="right">Roles</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.email}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.email}
                                </TableCell>
                                <TableCell align="right">{row.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button onClick={() => navigate(`/project/edit/${currentProject?._id}`)} variant="contained" color="success" sx={{m: 2, ml:{xs: 2, md: 0}}}>
                    Edit
                </Button>
                <Button onClick={(e) => handleAction(e, `/projects/delete/${currentProject?._id}`)} variant="contained" color="error" sx={{m: 2}}>
                    Delete
                </Button>
                <Badge badgeContent={currentProject?.discussion?.length} color="secondary" sx={{ml: {md: 56, xs: 18}, }}>
                    <QuestionAnswerIcon color="action" />
                </Badge>
                <Badge badgeContent={currentProject?.members?.length} color="success" sx={{ml: {md: 4, xs: 4}}}>
                    <PeopleAltIcon color="action" />
                </Badge>
            <Divider/>

            <Tasks project_id={currentProject?._id} />
            <Divider/>
            <Box component="form" noValidate onSubmit={handleAction} sx={{ mt: 3 }}>
            <h3>Discussions:</h3>
                {currentProject?.creator_id === userCredentials?.user._id ? <Grid container spacing={0} sx={{width: {xs: "100%", md: "50%"}, display: "flex" }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="title"
                            label="Discussion title"
                            type="text"
                            id="title"
                        />
                        <Button
                            type="submit"
                            align="center"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create
                        </Button>
                    </Grid>
                </Grid> : null}
            </Box>
            <Discussions project_id={currentProject?._id}/>
            <Divider sx={{m: 1}}/>
            <Attachments project_id={currentProject?._id} />
        </div>
    );
}

export default ShowProject;
