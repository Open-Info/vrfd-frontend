import { FLAG_CHECK_API, API_GET_OPTION, ADDR_VIEW_API, VOTE_API, API_PATCH_OPTION } from "@/helpers/constants";

export const checkAddress = async (addr: string) => {
  const result = await fetch(`${FLAG_CHECK_API}/${addr}`, API_GET_OPTION);
  return result.json();
};

export const getAddrsFromStatus = async (status: string) => {
  const result = await fetch(`${ADDR_VIEW_API}?status=${status}`, API_GET_OPTION);
  return result.json();
};

export const voteAddress = async (status: string, address: string) => {
  const result = await fetch(`${VOTE_API}/${status}?address=${address}`, API_PATCH_OPTION);
  return result.json();
};