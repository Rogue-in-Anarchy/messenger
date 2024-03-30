import { ethers } from "ethers";
import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import nameServiceABI from "../constants/ABIs/nameServiceABI.json";
import {useNavigate} from "react-router-dom";

import { toast } from 'react-toastify';

const UseLoginHook = (name) => {

  
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const navigate = useNavigate();

     return useCallback(async () => {
        if (!isSupportedChain(chainId)) return console.error("Wrong network");
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();

        const nameServiceContract = new ethers.Contract(
          import.meta.env.VITE_NAME_SERVICE_CONTRACT_ADDRESS,
          nameServiceABI,
          signer
        );
        console.log("connected",name);

       try{ 
         const login =await nameServiceContract.nameToAddress(name);

         if(login !== "0x0000000000000000000000000000000000000000"){
          toast("Logged In");
            navigate("/chat");
            return console.log("Logged In");
         }

         toast("Name not found");
         return console.log("Login failed")
            
          }
          catch(e){
          toast("Login failed");
          return console.log("Login failed")
          }
    



  }, [name, chainId, walletProvider]);

}

export default UseLoginHook;