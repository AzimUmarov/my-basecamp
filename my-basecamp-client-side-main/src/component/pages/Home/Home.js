import React, {useContext, useState} from "react";
import useFetchProjects from "../../../hooks/FetchProjects";
import ProjectCard from "../Project/ProjectCard";
import Grid from "@mui/material/Grid";
import UserCredentialsContext from "../../../context/Credentials/UserCredentialsContext";

export function Home({visibility}){
    const {data,error} = useFetchProjects('/projects/all');
    console.log("data:")
    console.log(data?.data);
    const {setProjects} = useContext(UserCredentialsContext);

    if(error)
        alert(error);

    setProjects(data?.data);

    if(visibility==="tunnel"){
        localStorage.setItem("userCredentials", JSON.stringify(
            {token: "eyJhbGciOiJIUzI1NiJ9.YXppbQ.mKaeg0WLXAWl9tIa6ZMSPjUae5sxRnpenDTlcR1G67A",
                user: {_id: "62eec6662c30dbc82eb73096", name: "jhon anonym", password: "88888888"}
            }));
    }
    return(
        <>
            <Grid container spacing={4} sx={{m: 0}}>
            {data?.data?.map((project) => (
            <ProjectCard visibility={visibility} project={project}/>
                ))}
            </Grid>
        </>

    )
}

export default Home;
