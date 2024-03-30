import { ethers } from "ethers";
import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import nameServiceABI from "../constants/ABIs/nameServiceABI.json";
import { toast } from 'react-toastify';

const UseRegisterHook = (name, uri) => {

    const { chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();

     return useCallback(async () => {
        if (!isSupportedChain(chainId)) return console.error("Wrong network");
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();

        const nameServiceContract = new ethers.Contract(
          import.meta.env.VITE_NAME_SERVICE_CONTRACT_ADDRESS,
          nameServiceABI,
          signer
        );
        console.log("connected",name, uri);

        const register = await nameServiceContract.registerNameService(name, uri);

        const registerReceipt = await register.wait();

        if (registerReceipt.status) {
          
            return console.log("registered");
        }

        toast("An error Occured");
        return console.log("registration failed")
    



  }, [name, uri, chainId, walletProvider]);

}

export default UseRegisterHook;