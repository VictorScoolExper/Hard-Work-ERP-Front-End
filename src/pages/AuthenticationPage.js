import {json, redirect} from 'react-router-dom';
import LoginForm from "../components/LoginForm";

function AuthenticationPage() {
  return <LoginForm />;
}

export default AuthenticationPage;

export async function action({request}) {

    const data = await request.formData();
    const authData = {
        email: data.get("email"),
        password: data.get("password"),
    };

    
}
