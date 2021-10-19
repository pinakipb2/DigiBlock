/* eslint-disable */
import Web3 from "web3";

const getWeb3 = () =>
  new Promise( async(resolve, reject) => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Requesting account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        resolve(web3);
      } else {
        reject(new Error('Metamask not found'));
      }
  });

export default getWeb3;