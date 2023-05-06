import Web3 from 'web3';

declare var window: any
declare var ethereum: any
declare var web3: any

if (window.ethereum) {
  window.web3 = new Web3(ethereum);
} else if (window.web3) {
  // Legacy dapp browsers...
  window.web3 = new Web3(web3.currentProvider);
} else {
  // Non-dapp browsers...
  console.log(
    'Non-Ethereum browser detected. You should consider trying MetaMask!'
  );
  window.web3 = new Web3(import.meta.env.VITE_TEST_BSC_RPC_URL as string)
}

export default web3;