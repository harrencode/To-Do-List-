import {Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import{ useState, useEffect}from "react";

//loading protected route
function ProtectedRoute({children}){
    const[isAuthorized, setIsAuthorized] = useState(null);

    //calling auht function and if there is any errors   
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    },[])
    //if token is expired
    const refreshToken = async() =>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try{
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if(res.status===200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            }else{
                setIsAuthorized(false)
            }
        }catch(error){
            console.log(error);
            setIsAuthorized(false)

        }
    };
    const auth = async()=>{
        const token= localStorage.getItem(ACCESS_TOKEN);

        //checks fora token
        if(!token){
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now()/1000
        //if token is  expired calls refresh token function
        if(tokenExpiration < now){
            await refreshToken();
        } else {
            setIsAuthorized(true);  //if token is expired 
        }
    };

    if (isAuthorized===null){
        return <div>Loading...</div>
    }
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;