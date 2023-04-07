import { FLAG_CHECK_API, API_GET_OPTION, ADDR_VIEW_API } from "@/helpers/constants";

export const checkAddress = async (addr: string) => {
  const result = await fetch(`${FLAG_CHECK_API}/${addr}`, API_GET_OPTION);
  return result.json();
};

export const getAddrsFromStatus = async (status: string) => { // getAddrs
  const result = await fetch(`${ADDR_VIEW_API}?status=${status}`, API_GET_OPTION);
  return result.json();
};