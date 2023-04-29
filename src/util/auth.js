import { redirect } from "react-router-dom";
import axios from "axios";
import { AUTH_API_URL } from "../api-routes";

function checkLocalStorage(key) {
  return localStorage.getItem(key) !== null;
}

const checkUserPermission = async() =>{
  try {
    const response = await axios(AUTH_API_URL + "/checkPermission", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    });

    if(response.data.valid === 'true'){
      return true;
    } 
    return false;
    
  } catch (error) {
    return false;
  }
    
}

export async function checkUserLogged() {
  const permission = await checkUserPermission();
  console.log(permission);
  if (checkLocalStorage("user") && permission) {
    return null;
  }
  localStorage.clear();
  return redirect("/auth");
}
