import {createContext, useEffect, useState} from 'react';

function getLocalData(name) {
    const data = localStorage.getItem(name);
    return data ? JSON.parse(data) : {};
}

const UserCredentialsContext = createContext({});

export const UserCredentialsProvider = ({children}) => {
    const [userCredentials, setUserCredentials] = useState(getLocalData("userCredentials"));
    const [projects, setProjects] = useState({});
    const [currentProject, setCurrentProject] = useState(getLocalData("currentProject"));
    const [creatorOfCurrentProject, setCreatorOfCurrentProject ] =  useState(getLocalData("creatorOfCurrentProject"));

    useEffect(() => {
        localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
    }, [userCredentials]);
    useEffect(() => {
        localStorage.setItem('currentProject', JSON.stringify(currentProject));
    }, [currentProject]);
    useEffect(() => {
        localStorage.setItem('creatorOfCurrentProject', JSON.stringify(creatorOfCurrentProject));
    }, [creatorOfCurrentProject]);

    return (
        <UserCredentialsContext.Provider value={{ userCredentials, setUserCredentials, projects, setProjects,
            currentProject, setCurrentProject, creatorOfCurrentProject, setCreatorOfCurrentProject
        }}>
            {children}
        </UserCredentialsContext.Provider>
    )
}

export default UserCredentialsContext;
