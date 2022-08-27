import React from 'react';
import useFetchProjects from "../../hooks/FetchProjects";
import Discussion from "./Discussion";

function Discussions({project_id}) {

    const {data,loading,error} = useFetchProjects(`/projects/${project_id}/discussion`);
    const discussions = data?.data;
    console.log(project_id)
    return (
        <>

            {discussions?.map(discussion =>
            <Discussion discussion={discussion}/>
                )}
        </>
    );
}

export default Discussions;
