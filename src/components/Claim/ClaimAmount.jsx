import { useContext,useEffect,useRef,useState } from "react";
import {ethers} from "ethers"
import Web3Context from "../../context/Web3Context";
import { toast } from "react-hot-toast";
import EthxBalance from "../EthxBalance/EthxBalance";
import { useRequestIds } from "../../utils/useRequestIds";

const ClaimAmount = () => {

 const {withdrawContract, chainId} = useContext(Web3Context);
 const claimAmountRef = useRef();
 const {requestIds, finalizedRequestId , updateRequestIds} = useRequestIds();
  const [isDisabled, setIsDisabled] = useState(false);
 
 const claimToken=async(e)=>{

   e.preventDefault();
   if(chainId !== 5){
    setIsDisabled(true);
    console.log("Please connect to Goerli Testnet");
    return;
  }
   const requestID = claimAmountRef.current.value.trim();

   if(isNaN(requestID) || requestID<=0){
    toast.error("Please enter a valid positive number.");
    return;
   }
   
   try{
    const transaction = await withdrawContract.claim(requestID);

    await toast.promise(transaction.wait(),
    {
      loading: "Claim is pending...",
      success: 'Claim successful 👌',
      error: 'Claim failed 🤯'
    });

    claimAmountRef.current.value = "";
    await updateRequestIds();

    } catch (error) {
        console.log("requesttstca " ,requestIds)
        if(!requestIds.split(",").includes(requestID)){
          toast.error("Enter Correct Request Id 😡");
        }
        else if(finalizedRequestId <= requestID){
          toast.error("Request Id is not Finalized 🙅🏻");
        }else{
          toast.error("Claim Failed 🤯");
          console.error(error.message)
        }
    }
  };
    return (
       <form onSubmit={claimToken} className="flex flex-col justify-center items-start pt-9 px-9 pb-4 font-semibold">
        <div className="flex w-[100%] text-black justify-between">
        <label className=" opacity-80 text-s mb-4">Enter Request ID</label>
        </div>
        <input className="p-6 w-[100%] rounded-xl border-[1px] border-[#93278F]  text-black" type="text" ref={claimAmountRef} placeholder="0" />
        <div className="mt-7 w-[100%] text-center">{requestIds.length >= 1 ? <div><span className="uppercase text-black font-medium">Request Id :</span>{' '}<span className="text-black font-extralight">{requestIds.split(",").reverse().join(",")}</span></div> : <div className="mt-6"></div>}</div>
        <div className="uppercase text-xs text-black flex justify-center font-bold items-center w-[100%] mt-5">"Claim only after your request ID is finalized."</div>
       <div className="w-[100%] bg-black border-b mt-5 rounded-xl"></div>
      
       <button onClick={claimToken} type="submit" className={`bg-[#93278F] font-medium rounded-lg text-m px-5 py-5 text-center text-white hover:text-black me-2 mb-2 w-[100%] mt-6 uppercase`}
       disabled={isDisabled}>Claim Token</button>
      </form>
    )
}
export default ClaimAmount;