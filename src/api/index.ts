import {
  FLAG_CHECK_API,
  API_GET_OPTION,
  ADDR_VIEW_API,
  VOTE_API,
  VOTES_GET_API,
  API_POST_OPTION,
  ENS_API,
  ENS_RESOLVE,
  VERIFIED_INFO,
  FLAGGED_INFO
} from "@/helpers/constants";

export const checkAddress = async (addr: string) => {
  const result = await fetch(`${FLAG_CHECK_API}/${addr}`, API_GET_OPTION);
  return result.json();
};

export const getAddrsFromStatus = async (status: string) => {
  const result = await fetch(
    `${ADDR_VIEW_API}?status=${status}`,
    API_GET_OPTION
  );
  return result.json();
};

export const voteAddress = async (
  status: string,
  target: string,
  source: string
) => {
  const result = await fetch(`${VOTE_API}/${status}`, {
    ...API_POST_OPTION,
    body: JSON.stringify({ target, source }),
  });
  return result.json();
};

export const getVotes = async (addr: string) => {
  const result = await fetch(
    `${VOTES_GET_API}?address=${addr}`,
    API_GET_OPTION
  );
  return result.json();
};

export const getENS = async (addr: string) => {
  const result = await fetch(
    `${ENS_API}?address=${addr}`,
    API_GET_OPTION
  );
  return result.json();
};

export const resolveENS = async (addr: string) => {
  const result = await fetch(
    `${ENS_RESOLVE}?ens=${addr}`,
    API_GET_OPTION
  );
  return result.json();
};

export const verifiedMeta = async (token_id: number) => {
  const result = await fetch(`${VERIFIED_INFO}/${token_id}`, API_GET_OPTION);
  console.log(result);
  return result.json();
};

export const flaggedMeta = async (token_id: number) => {
  const result = await fetch(`${FLAGGED_INFO}/${token_id}`, API_GET_OPTION);
  return result.json();
};
