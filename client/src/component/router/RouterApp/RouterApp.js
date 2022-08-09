import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import Error from "../../pages/NotFound/NotFound";
import Home from "../../pages/Home/Home";
import {Container} from "@mui/material";
import AddProject from "../../pages/Project/AddProject";
import ShowProject from "../../pages/Project/ShowProject";
import EditProject from "../../pages/Project/EditProject";
import ProfileEdit from "../../pages/User/Profile";

function RouterApp(props) {
    return (
        <Container  maxWidth="xl" className="mt-4">
            <Routes>
                <Route path="/" element={<Home visibility="all" />} />
                <Route path="/all-projects" element={<Home visibility="all" />} />
                <Route path="/my-projects" element={<Home visibility="my-projects" />}/>
                <Route path="/shared-with-me" element={<Home visibility="shared"/>} />
                <Route path="/create-new" element={<AddProject/>} />
                <Route path="/project/:id" element={<ShowProject />} />
                <Route path="/project/edit/:id" element={<EditProject />} />
                <Route path="/profile" element={<ProfileEdit />} />
                <Route path="/logout" element={<ProfileEdit logout="true" />} />
                <Route path="/tunnel" element={<Home visibility="tunnel" />} />
                <Route path="*" element={<Error/>} />
            </Routes>
        </Container>
    );
}


export default RouterApp;
