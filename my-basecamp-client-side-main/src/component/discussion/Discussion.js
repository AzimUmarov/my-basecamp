import * as React from 'react';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import useFetchProjects from "../../hooks/FetchProjects";
import Message from "../message/Message";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ServiceAPI from "../../API/ServiceAPI";
import {useContext} from "react";
import UserCredentialsContext from "../../context/Credentials/UserCredentialsContext";
import ForumIcon from '@mui/icons-material/Forum';
import SendIcon from '@mui/icons-material/Send';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate} from "react-router-dom";

function Discussion({discussion}) {
    const {data,loading,error} = useFetchProjects(`/discussion/${discussion?._id}/message`);
    const messages = data?.data;
    let {userCredentials, currentProject} = useContext(UserCredentialsContext);
    let navigate = useNavigate();

    const handleMessageAction = async (event, what) => {
        event.preventDefault();
        if(what){
            try {
                const response = await ServiceAPI.delete(what,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': userCredentials?.token
                        },
                    }
                );
                console.error("disc  -------------------")
                console.log(response?.data);
                // navigate( `/project/${currentProject?._id}`);

                window.location.href = window.location.href;
            } catch (err) {
                console.error("err  -------------------");
                console.log(err);
            }
        }
        const data = new FormData(event.currentTarget);
            const object = {
                message: data.get("title"),
                user: userCredentials.user
            };
            console.log(object);
            console.log(`/projects/${currentProject?._id}/discussion/create`);
            try {
                const response = await ServiceAPI.post(`/discussion/${discussion?._id}/message/create`, JSON.stringify(object));
                console.error("disc  -------------------")
                console.log(response?.data);
                navigate( `/project/${currentProject?._id}`);

                window.location.href = window.location.href;
            } catch (err) {
                console.log(err)
            }
    };

    return (
        <>
            <Typography
                width="70%"
                variant="h5"
                align="center"
                sx={{
                    display: 'block',
                    fontFamily: 'Arial',
                    fontWeight: 700,
                    color: 'inherit',
                    mt:4,
                    mb: 4,
                }}
            >
                <ForumIcon/>
                {discussion?.title || "title"}
                <Typography sx={{justifyContent: "end", display: "flex", mt: -4}}>
                    <BorderColorIcon onClick={() => navigate(`/discussion/edit/${discussion?._id}`)} sx={{mr: 4}}/>
                    <DeleteForeverIcon cursor="pointer" onClick={(e) => handleMessageAction(e, `/discussion/delete/${discussion?._id}`)} sx={{mr: {xs: -15, md: 8}}}/>
                </Typography>
            </Typography>
            <Typography component="div" sx={{height: {md: 500, xs: 350},width: {xs: "100%", md: '67%'},overflowY: "scroll",  font:"16px/26px Georgia, Garamond, Serif"}}>
            <List sx={{ width: '100%', maxWidth: 1000, bgColor: 'background.paper' }}>
                {messages?.map(message =>
                    <Message message={message} handleMessageAction={handleMessageAction} />
                )}
            </List>
            </Typography>
            <Box component="form" noValidate onSubmit={handleMessageAction} sx={{ml: 3, mt: 3, alignItems: 'end'}}>
                        <TextField
                            name="title"
                            label="Your Message"
                            type="text"
                            id="title"
                            variant="standard"
                            sx={{width: {md: 850, xs: 300}}}
                        />
                        <Button
                            type="submit"
                            align="center"
                            variant="outlined"
                            sx={{ mt: 1.5, ml:1 }}
                        ><SendIcon/>
                        </Button>
            </Box>
        </>
    );
}

export default Discussion;

