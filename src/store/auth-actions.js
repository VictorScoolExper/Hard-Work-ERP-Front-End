import { userActions } from "./user-slice";

export function login(authData) {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies and credentials
        body: JSON.stringify(authData),
      });

      if (response.status === 422 || response.status === 401) {
        return response;
      }

      if (!response.ok) {
        throw json(
          { message: "Could not authenticate user." },
          { status: 500 }
        );
      }

      const resData = await response.json();
      return resData;
    };

    try {
        const userData = await fetchData();
        dispatch(userActions.loginUser({
            id: userData.id,
            name: userActions.name,
            lastname: userActions.lastname,
            role: userActions.role,
        }));
       
    } catch (error) {
        throw new Error(error)
    }
  };

  
}
