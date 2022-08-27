import React from 'react';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import useFetchProjects from "../../hooks/FetchProjects";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useNavigate} from "react-router-dom";

function Message({message, handleMessageAction}) {
    const {data} = useFetchProjects(`/user/${message?.creator_id}`);
    const user = data?.data;
    const navigate = useNavigate();

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={user?.name} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
                primary={message.message}
                secondary={
                    <React.Fragment>
                        <Typography sx={{justifyContent: "end", display: "flex", mt: -4}}>
                            <BorderColorIcon onClick={() => navigate(`/message/edit/${message?._id}`)} sx={{mr: 4}}/>
                            <DeleteForeverIcon cursor="pointer" onClick={(e) => handleMessageAction(e, `/message/delete/${message._id}`)} sx={{mr: 8}}/>
                        </Typography>
                        <Typography className="text-end mt-1" sx={{mr: 8}}>{user?.name}</Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    );
}

export default Message;

