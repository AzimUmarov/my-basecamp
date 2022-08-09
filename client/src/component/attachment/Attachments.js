import React from 'react';
import useFetchProjects from "../../hooks/FetchProjects";

function Attachments({project_id}) {

    const {data} = useFetchProjects(`/project/${project_id}/attachment`);
    const attachments = data?.data;
    console.log("------------------------------------------------------------------")
    console.log("------------------------------------------------------------------")
    console.log("------------------------------------------------------------------")
    console.log("------------------------------------------------------------------")
    console.log("------------------------------------------------------------------")
    console.log("------------------------------------------------------------------")
    console.log("------------------------------------------------------------------")
    console.log(attachments);

    return (
        <div>
            <h6>Attach</h6>
            <p>{JSON.stringify(attachments)}</p>
        </div>
    );
}

export default Attachments;
