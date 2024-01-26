import { useContext,useRef, useState , useEffect } from "react";
import {ethers} from "ethers"
import Web3Context from "../../context/Web3Context";
import { toast } from "react-hot-toast";
import { useEthxBalance } from "../../utils/useEthxBalance";

const WithdrawAmount = () => {

 const {withdrawContract , selectedAccount, chainId} = useContext(Web3Context);
 const unstakeAmountRef = useRef(); 
 const { ethxBalance } = useEthxBalance();
 const [isDisabled, setIsDisabled] = useState(false);

 const unstakeToken = async (e) => {
  e.preventDefault();
  if(chainId !== 5){
    setIsDisabled(true);
    console.log("Please connect to Goerli Testnet");
    return;
  }
  const amount = unstakeAmountRef.current.value.trim();
  console.log(amount);

  if (isNaN(amount) || amount <= 0) {
    toast.error("Please enter a valid positive number.");
    return;
  }

  const amountToUnstake = ethers.parseUnits(amount, 18).toString();

  try {

    const transactionPromise = new Promise(async (resolve, reject) => {
      try {
        const transaction = await withdrawContract.requestWithdraw(amountToUnstake, selectedAccount);
        const receipt = await transaction.wait();
        resolve(receipt);
      } catch (error) {
        reject(error);
      }
    });

    await toast.promise(transactionPromise, {
      loading: "Transaction is pending...",
      success: 'Transaction successful 👌',
      error: 'Transaction failed 🤯',
    });

    unstakeAmountRef.current.value = "";

  } catch (error) {
    if (withdrawContract == null) {
      toast.error("Connect To Wallet First");
    } else {
      toast.error("Transaction Failed 🤯");
      console.error(error.code);
    }
  }
};
    return (
      <form onSubmit={unstakeToken} className="flex flex-col justify-center items-start pt-9 px-9 pb-4 font-semibold">
        <div className="flex w-[100%] text-black justify-between">
        <label className=" opacity-80 text-s  mb-4">Enter ETHx amount</label>
        <label>My ETHx: {ethxBalance}</label>
        </div>
        <input className="p-6 w-[100%] rounded-xl border-[1px] border-[#93278F] outline-none text-black" type="text" ref={unstakeAmountRef} placeholder="0.0" />

       <div className="uppercase text-xs text-black flex justify-center items-center w-[100%] font-bold px-8 mt-12 text-center">"After successfully unstaking tokens, a request ID will be generated."</div>
       <div className="w-[100%] bg-black border-b mt-5 rounded-xl"></div>
      
       <button onClick={unstakeToken} type="submit" className={`bg-[#93278F] font-medium rounded-lg text-m px-5 py-5 text-center text-white hover:text-black me-2 mb-2 w-[100%] mt-6 uppercase`}
       disabled={isDisabled}>UnStake Token</button>
      </form>
       )
}
export default WithdrawAmount;