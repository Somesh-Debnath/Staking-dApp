import { useContext,useEffect,useRef, useState } from "react";
import {ethers} from "ethers"
import Web3Context from "../../context/Web3Context";
import { toast } from "react-hot-toast";
import { useEthxBalance } from "../../utils/useEthxBalance";

const StakeAmount = () => {

 const {stakingContract , selectedAccount, ethxContract, chainId} = useContext(Web3Context);
 const stakeAmountRef = useRef();
 const [ethAmount, setEthAmount] = useState(0);
 const { ethxBalance, updateBalance } = useEthxBalance();
 const [isDisabled, setIsDisabled] = useState(false);

  const handleAmountChange = (e) => {
    const amount = e.target.value.trim();

    const amountToConvert = (amount*(1/1.015151)).toFixed(6);

    setEthAmount(amountToConvert);
  };

 const stakeToken=async(e)=>{
   e.preventDefault();
   if(chainId !== 5){
    setIsDisabled(true);
    console.log("Please connect to Goerli Testnet");
    return;
  }
   const amount = stakeAmountRef.current.value.trim();

   if(isNaN(amount) || amount<=0){
    toast.error("Please enter a valid positive number.");
    return;
   }

   const amountToStake = ethers.parseUnits(amount,18).toString();

   try{
    const transaction = await stakingContract.deposit(selectedAccount,selectedAccount,{value: amountToStake}); 
    await toast.promise(transaction.wait(),
    {
      loading: "Transaction is pending...",
      success: 'Transaction successful 👌',
      error: 'Transaction failed 🤯'
    });

    stakeAmountRef.current.value = "";
    await updateBalance();

    } catch (error) {
      if(stakingContract == null){
        toast.error("Connect To Wallet First")
      }else{
        toast.error("Staking Failed");
      }
    }
  };

    return (
      <form onSubmit={stakeToken} className="flex flex-col justify-center items-start pt-9 px-9 pb-4 font-semibold">
        <div className="flex w-[100%] text-black justify-between">
        <label className=" opacity-80 text-s  mb-4">Enter ETH amount</label>
        <label>My ETHx: {ethxBalance}</label>
        </div>
        <input className="p-6 w-[100%] rounded-xl border-[1px] border-[#93278F] outline-none text-black" type="text" ref={stakeAmountRef} placeholder="0.0"  onChange={handleAmountChange}/>
        <div className="flex justify-between text-black w-[100%] mt-5 ">
        <label >You will get:</label>
        <label>{ethAmount} ETHx</label>
       </div>
       <div className="w-[100%] bg-black border-b mt-5 rounded-xl"></div>
       <div className="flex justify-between text-black w-[100%] mt-5 ">
          <label>Exchange rate</label>
          <label>1 ETHx = 1.015151 ETH</label>
       </div>
        { 
       <button onClick={stakeToken} type="submit" className= {`bg-[#93278F] font-medium rounded-lg text-m px-5 py-5 text-center text-white hover:text-black me-2 mb-2 w-[100%] mt-6 uppercase`}
       disabled={isDisabled} >Stake Token</button>
        }
      </form>
       )
}
export default StakeAmount;