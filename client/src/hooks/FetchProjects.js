import {useContext, useEffect, useState} from "react";
import ServiceAPI from "../API/ServiceAPI";
import UserCredentialsContext from "../context/Credentials/UserCredentialsContext";


export default function useFetch(url, update){
    console.log(url);
    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)
    const {userCredentials} = useContext(UserCredentialsContext);
    useEffect(() => {
        (
            async function(){
                console.log("-------------------------------\n---------------------------fetching: " + url);
                try{
                    setLoading(true);
                    let response;
                        response = await ServiceAPI.post(url,
                            JSON.stringify(userCredentials),
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': userCredentials?.token
                                },
                            }
                        );
                    console.log(response.data);
                    setData(response);
                }catch(err){
                    console.log(err)
                    setError(err);
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [url, update]);

    return { data, error, loading }

}
