import axios from "axios";

import { ADDRESS_API_URL } from "../../api-routes";

export const getSingleAddress= async (addressId) => {
  const address = await axios(ADDRESS_API_URL + `/${addressId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return address.data;
};

export const updateSingleAddress = async (address) =>{
  return await axios.put(ADDRESS_API_URL + `/${address.address_id}`, address, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true
  });
}