import axios from "axios";

import { VENDOR_API_URL } from "../../api-routes";

export const getVendorAddress = async (vendorId) => {
  const address = await axios(VENDOR_API_URL + `/address/${vendorId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return address.data;
};
