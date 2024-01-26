import React,{useContext} from 'react'
import Web3Context from '../../context/Web3Context'
import { useNavigate } from 'react-router-dom'

function Homepage() {
    const navigate=useNavigate();
    const {chainId} = useContext(Web3Context);
  return (
    <div className='flex gap-[18rem]'>
        <div className='flex flex-col space-y-5 mt-7'>
        <h1 className="text-[#93278F] font-bold text-3xl">Welcome to Staking dApp</h1>
        <p className="text-black text-lg font-semibold">Stake your ETH and earn ETHx</p>
        <button className="bg-[#93278F] font-medium rounded-lg text-m px-5 py-5 text-center text-white hover:text-black me-2 mb-2 w-[100%] mt-6 uppercase"
        onClick={()=>navigate("/stake")}>
            {chainId !== 5 ? "Connect Wallet" : "Get Started"}
        </button>
        </div>

        <img src="./landinggirl.png" alt="btc" className="w-[400px] h-[512px] rounded-xl mt-[-58px]" />

    </div>
  )
}

export default Homepage