import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";

// export function getTokenDuration(){
//     const storedExpirationDate = localStorage.getItem('expiration');
//     const expirationDate = new Date(storedExpirationDate);
//     const now = new Date();
//     const duration = expirationDate.getTime() - now.getTime();
//     return duration
// }

// export function getAuthToken(){
//     const token = localStorage.getItem('token');

//     if(!token){
//         return;
//     }

//     const tokenDuration = getTokenDuration();

//     if(tokenDuration < 0){
//         return 'EXPIRED';
//     }

//     return token;
// }

// export function tokenLoader(){
//     return getAuthToken();
// }

// export function checkAuthLoader(){
//     const token = getAuthToken();

//     if(!token){
//         return redirect('/auth');
//     }

//     return null;
// }

export function checkAuthCookieLoader() {
  const token = checkCookieExists('token');

  if (!token) {
    return redirect("/auth");
  }

  return null;
}

// When multiple cookies are involved
// export function checkCookieExists(cookieName) {
//     const cookieArray = document.cookie.split(';');
//     for (let i = 0; i < cookieArray.length; i++) {
//       const cookiePair = cookieArray[i].split('=');
//       if (cookieName === cookiePair[0].trim()) {
//         console.log(cookieName);
//         return true;
//       }
//     }
//     return false;
// }
  
export function checkUserLogged() {
  const userLogged = useSelector((state)=> state.user.loggedIn);
  if(userLogged !== true){
    return redirect("/auth");
  }
  
  return redirect("/");
}
  