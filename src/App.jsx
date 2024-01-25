import { useState } from 'react'
import './App.css'
import Wallet from './components/Wallet/Wallet'
import Navigation from './components/Navigation/Navigation'
import StakeAmount from './components/Stake/StakeAmount'
import WithdrawAmount from './components/Withdraw/WithdrawAmount'
import ApproveAmount from './components/Approve/ApproveAmount'
import ClaimAmount from './components/Claim/ClaimAmount'
import "../src/App.css"
import {Toaster} from "react-hot-toast"
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  const [displaySection, setDisplaySection] = useState("stake");

  const handleButtonClick = (section) => {
    setDisplaySection(section);
  };

  return (
      <BrowserRouter>
      <div className="w-[100%] h-[100vh] bg-[#1C1C22] radial">
    <div >
      <Wallet>
        <Navigation/>
        <div className="flex flex-col justify-start items-center m-10">
            <div className="flex justify-between mt-4 button-section mb-5 "></div>
      <Routes>
          <Route path="/" element={
          <div className="w-[500px] rounded-xl bg-[#34343D]">
            <StakeAmount />
          </div>
          }></Route>
          <Route path="/stake" element={
          <div className="w-[500px] rounded-xl bg-[#34343D]">
            <StakeAmount />
          </div>
          }></Route>
          <Route path="/approve" element={
          <div className="w-[500px] rounded-xl bg-[#34343D]">
            <ApproveAmount />
          </div>
          }></Route>
          <Route path="/withdraw" element={
          <div className="w-[500px] rounded-xl bg-[#34343D]">
            <WithdrawAmount />
          </div>
          }></Route>
          <Route path="/claim" element={
          <div className="w-[500px] rounded-xl bg-[#34343D]">
            <ClaimAmount />
          </div>
          }></Route>
        </Routes>
        </div>
        <Toaster/>
      </Wallet>
    </div>
    </div>
        
      </BrowserRouter>
  )
}

export default App
