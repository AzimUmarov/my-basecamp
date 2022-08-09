import React from 'react';
import {useParams} from "react-router-dom";

function EditProject(props) {
    let { id } = useParams();

    return (
        <div>
            <div>edit project</div>
            <h1>{id}</h1>
        </div>
    );
}

export default EditProject;
