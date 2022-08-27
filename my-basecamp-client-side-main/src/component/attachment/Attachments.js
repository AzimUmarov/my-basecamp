import React from 'react';
import useFetchProjects from "../../hooks/FetchProjects";
import Typography from "@mui/material/Typography";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ServiceAPI from "../../API/ServiceAPI";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

function Attachments({project_id}) {

    const {data} = useFetchProjects(`/project/${project_id}/attachment`);
    const attachments = data?.data;

    // function getBase64(file) {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         return reader.onload = () => reader.result;
    // }

    async function handler(e, command){
        e.preventDefault();
        if(command) {
            try {
                const response = await ServiceAPI.delete(`/attachment/delete/${command}`)
                console.log(response?.data);
                window.location.href = window.location.href;
            } catch (e) {
                console.log(e);
            }
        }
        else {
            const data = new FormData(e.currentTarget);
            let fileInput = data.get("file");
            const object = {
                type: fileInput?.name,
                data: fileInput.toString()
            }
            try {
                const response = await ServiceAPI.post(`/project/${project_id}/attachment/create`, JSON.stringify(object));console.log(response?.data);
                window.location.href = window.location.href;
            } catch (err) {
                console.log(err);
            }
            console.log(fileInput)
            console.log(object)
        }
    }

    return (
        <div>

            <Box component="form" noValidate onSubmit={handler} sx={{ mt: 3 }} >
                <h3>Attachments:</h3>
                <Grid container spacing={0} sx={{width: {xs: "100%", md: "50%"}, display: "flex" }}>
                    <Grid item xs={12}>
                            <input
                                name="file"
                                type="file"
                                id="file"
                            />
                        <Button
                            type="submit"
                            align="center"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            <UploadFileIcon sx={{fontSize: "medium"}}/>
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {attachments?.map(item =>
                <Grid container spacing={6} sx={{width: {xs: "100%", md: "100%"}, m: 1, ml: 0, display: "flex" }}>
                    <Typography component="span" sx={{width: {md: "70%", xs: "70%"}, mt: {md: 1.3, xs: 1.3}, mr: {md: 5, xs: 3}}}>{item?.type || "name"}</Typography>
                    <Button>
                    <FileDownloadIcon />
                    </Button>
                    <Button>
                        <DeleteForeverIcon onClick={(e) => handler(e, item?._id)} sx={{m: 1 }} />
                    </Button>
                </Grid>
            )}
        </div>
    );
}

export default Attachments;
