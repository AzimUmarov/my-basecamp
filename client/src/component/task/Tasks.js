import React from 'react';
import useFetchProjects from "../../hooks/FetchProjects";

function Tasks({project_id}) {
    const dataTask = useFetchProjects(`/projects/${project_id}/tasks`);
    const tasks = dataTask?.data;

    return (
        <div>
            <h6>Task:</h6>
            <p>{JSON.stringify(tasks)}</p>
        </div>
    );
}

export default Tasks;
