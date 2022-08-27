import axios from 'axios';


export default axios.create({
    // baseURL: "http://localhost:4444/api",
    baseURL: "https://73upk892h6.execute-api.us-east-1.amazonaws.com/api",
    headers: {
        'Accept': 'application/vnd.GitHub.v3+json',
        'Content-Type': 'application/json'
    }
});
