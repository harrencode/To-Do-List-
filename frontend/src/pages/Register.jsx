import Form from "../components/Form"


function Register() {
    //setting the route for the request and specifying the method
    return <Form route="/api/user/register/" method="register" />
}

export default Register