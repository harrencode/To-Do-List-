import {Naviagte} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import{ useState, useEffect}from "react";

//loading protected route
function ProtectedRoute({children}){
    const[isAusthorized, setIsAusthorized] = useState(nulll);

    //calling auht function and if there is any errors   
    useEffect(() => {
        auth().catch(() => setIsAusthorized(false))
    },[])
    //if token is expired
    const refreshToken = async() =>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try{
            const res = await api.post("/api/token/refresh/", {
                refresh:refreshToken,
            });
            if(res.staus===200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAusthorized(true)
            }else{
                setIsAusthorized(false)
            }
        }catch(error){
            console.log(error);
            setIsAusthorized(false)

        }
    };
    const auth = async()=>{
        const token= localStorage.getItem(ACCESS_TOKEN);

        //checks fora token
        if(!token){
            setIsAusthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now()/1000
        //if token is  expired calls refresh token function
        if(tokenExpiration-now){
            await refreshToken();
        } else {
            setIsAusthorized(true);  //if token is expired 
        }
    };

    if (isAusthorized===null){
        return <div>Loading...</div>
    }
    return isAusthorized ? children : <Naviagte to="/login"/>;
}

export default ProtectedRoute;