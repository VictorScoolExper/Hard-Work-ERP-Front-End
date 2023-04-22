import { json, redirect } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth-actions";
import { checkUserLogged } from "./util/auth";

function AuthenticationPage() {
  return <LoginForm />;
}

export default AuthenticationPage;

export async function action ({request}) {
  const dispatch = useDispatch();

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };  

  await dispatch(login(authData));

  checkUserLogged();
}

// export async function action({ request }) {
//   const data = await request.formData();
//   const authData = {
//     email: data.get("email"),
//     password: data.get("password"),
//   };

//   const response = await fetch('http://localhost:4000/api/v1/auth/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     credentials: 'include', // Include cookies and credentials
//     body: JSON.stringify(authData)
//   });

//   if(response.status === 422 || response.status === 401){
//     return response;
//   }

//   if(!response.ok){
//     throw json({message: 'Could not authenticate user.'}, {status: 500})
//   }

//   const resData = await response.json();
//   const token = resData.token;
//   // save token in local storage
//   localStorage.setItem('token', token);
//   const expiration = new Date();
//   expiration.setHours(expiration.getHours() + 1);
//   localStorage.setItem('expiration', expiration.toISOString());

//   return redirect('/');
// }
