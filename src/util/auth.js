import { redirect } from "react-router-dom";

function checkLocalStorage(key){
  return localStorage.getItem(key) !== null;
}
  
export function checkUserLogged() {
  if(checkLocalStorage('user')){
    return null;
  } 
  return redirect("/auth");
}
  