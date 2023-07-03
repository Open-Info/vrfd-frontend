export const FLAG_CHECK_API = 'https://vrfd.dev/scala/flag_check' // FLAG_CHECK_API
export const ADDR_VIEW_API = 'https://vrfd.dev/api/db/view' // ADDR_VIEW_API
export const VOTE_API = 'https://vrfd.dev/api/db'
export const VOTES_GET_API = 'https://vrfd.dev/api/db/votes'
export const ENS_API = 'https://vrfd.dev/api/db/ens_name'
export const ENS_RESOLVE = 'https://vrfd.dev/api/db/ens_resolve'

export const API_GET_OPTION: any = {
  method: 'GET',
  headers: { 
    accept: 'application/json', 
  }
};

export const API_POST_OPTION: any = {
  method: 'POST',
  headers: { 
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
};

export const OWNER_ADDR = import.meta.env.VITE_OWNER_ADDR
