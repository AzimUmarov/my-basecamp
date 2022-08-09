import axios from 'axios';


export default axios.create({
    baseURL: "http://localhost:4444/api",
    headers: {
        'Accept': 'application/vnd.GitHub.v3+json',
        'Content-Type': 'application/json'
    }
});
