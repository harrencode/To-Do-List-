import { useState } from "react"
import api from "../api"
import{ useNavigate } from "react-router-dom"  //hook to access the navigatiom
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Form.css"


//route-the route that wil follow and metod detect login or registration
function Form({route, method}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const name = method === "login" ? "Login" : "Register";
    
    //prevent form submitting the form which will remove default behaviour
    const handleSubmit = async(e) => {
        setLoading(true);  
        e.preventDefault();

        try{
            //sending the request
            const res = await api.post(route,{username,password})
            //if no error check the methodd
            if (method==="login"){

                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")

            }//if not registerd we have to login to get tokens
            else{
                navigate("/login")
            

            }
        //if error occurs handle here
        }catch(error){
            alert(error)

        }finally{
            setLoading(false)
        }


    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        
        <input 
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />

        <input 
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <button className="form-button" type="submit">
             {name}
        </button>

    </form>

}
export default Form