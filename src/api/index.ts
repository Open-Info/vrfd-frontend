import { VRFD_SERVER, API_GET_OPTION } from '@/helpers/constants'

export const checkAddress = async (addr: string) => {
  const result = await fetch(`${VRFD_SERVER}/${addr}`, API_GET_OPTION);
  return result.json();
}