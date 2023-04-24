import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/auth";

const login = async (email, password) => {
  return await axios
    (API_URL + "/login", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      data: {email,password}
    })
    .then((response) => {
      if (response.data.userId) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      // console.log(response.data);
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;