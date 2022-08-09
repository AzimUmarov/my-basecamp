import React from 'react';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import useFetchProjects from "../../hooks/FetchProjects";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Message({message, handleMessageAction}) {
    const {data,loading,error} = useFetchProjects(`/user/${message?.creator_id}`);
    const user = data?.data;

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
                            <BorderColorIcon sx={{mr: 4}}/>
                            <DeleteForeverIcon cursor="pointer" onClick={(e) => handleMessageAction(e, `/message/delete/${message._id}`)} sx={{mr: 8}}/>
                        </Typography>
                        <p className="text-end mt-1">{user?.name}</p>
                    </React.Fragment>
                }
            />
        </ListItem>
    );
}

export default Message;

