import React, { useContext,useState } from 'react'
import Web3Context from '../../context/Web3Context'
import { useNavigate } from 'react-router-dom'

const Navigation = ()=>{
  const [displaySection, setDisplaySection] = useState("home");

  const handleButtonClick = (section) => {
    setDisplaySection(section);
  };
  const navigate=useNavigate();
  return(
    <header className="w-[100%] h-15 p-6 m-0 flex justify-center">
      <button className="text-[#93278F] font-bold absolute top-10 left-5 cursor-pointer px-5" 
      onClick={()=>{
        handleButtonClick("home");
        navigate("/")}}>Staking dApp</button>
    <div className=" text-sm text-white flex
    justify-center items-center gap-10 button-section">
      <button className={displaySection === "stake" ? "active" : ""}
      onClick={()=>{
        handleButtonClick("stake");
        navigate("/stake")
      }}>
        Stake
      </button >
      <button className={displaySection === "approve" ? "active" : ""}
      onClick={()=>{
        handleButtonClick("approve");
        navigate("/approve")
      }}>
        Approve
      </button >
      <button className={displaySection === "withdraw" ? "active" : ""}
      onClick={()=>{
        handleButtonClick("withdraw");
        navigate("/withdraw")
      }}>
        Withdraw
      </button >
      <button className={displaySection === "claim" ? "active" : ""}
      onClick={()=>{
        handleButtonClick("claim");
        navigate("/claim")
      }}>
        Claim
      </button >
    </div>
  </header>
  )
}

export default Navigation