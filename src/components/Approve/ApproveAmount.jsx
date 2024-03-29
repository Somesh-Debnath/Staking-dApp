import { useContext,useEffect,useRef, useState } from "react";
import {ethers} from "ethers"
import Web3Context from "../../context/Web3Context";
import { toast } from "react-hot-toast";
import { useEthxBalance } from "../../utils/useEthxBalance";

const ApproveAmount = () => {

 const {withdrawContract,ethxContract,selectedAccount, chainId} = useContext(Web3Context);
 const approveStakeAmountRef = useRef();
 const { ethxBalance, updateBalance } = useEthxBalance();
 const [isDisabled, setIsDisabled] = useState(false);

 const approveToken=async(e)=>{

   e.preventDefault();
   if(chainId !== 5){
    setIsDisabled(true);
    console.log("Please connect to Goerli Testnet");
    return;
  }
   const amount = approveStakeAmountRef.current.value.trim();
 
   if(isNaN(amount) || amount<=0){
    toast.error("Please enter a valid positive number.");
    return;
   }

   const amountToApprove = ethers.parseUnits(amount,18).toString();

   try{
    const approval = await ethxContract.approve(withdrawContract.target,amountToApprove)

    await toast.promise(approval.wait(),
    {
      loading: "Approval is pending...",
      success: 'Approval successful 👌',
      error: 'Approval failed 🤯'
    });

    approveStakeAmountRef.current.value = "";

    } catch (error) {
        if(ethxContract == null){
            toast.error("Connect To Wallet First")
        }else{
            toast.error("Staking Failed");
            console.error(error.message)
        }
    }
  };

    return (
        <form onSubmit={approveToken} className="flex flex-col justify-center items-start pt-9 px-9 pb-4 font-semibold">
        <div className="flex w-[100%] text-black justify-between">
        <label className=" opacity-80 text-s  mb-4">Enter ETHx amount</label>
        <label>My ETHx: {ethxBalance}</label>
        </div>
        <input className="p-6 w-[100%] rounded-xl border-[1px] border-[#93278F] outline-none text-black" type="text" ref={approveStakeAmountRef} placeholder="0.0" />

       <div className="uppercase text-xs text-black font-bold flex justify-center items-center w-[100%] mt-16">"AFTER APPROVAL ONLY YOU CAN UNSTAKE YOUR TOKEN"</div>
       <div className="w-[100%] bg-black border-b mt-5 rounded-xl"></div>
      
       <button onClick={approveToken} type="submit" className={`bg-[#93278F] font-medium rounded-lg text-m px-5 py-5 text-center text-white hover:text-black me-2 mb-2 w-[100%] mt-6 uppercase`}
       disabled={isDisabled}>Approve Token</button>
      </form>
      )
}

export default ApproveAmount;