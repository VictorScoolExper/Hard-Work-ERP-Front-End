import axios from "axios";

import { CLIENT_API_URL } from "../../api-routes";

export const getClientAddresses = async (clientId) => {
  const address = await axios(CLIENT_API_URL + `/address/${clientId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return address.data;
};
