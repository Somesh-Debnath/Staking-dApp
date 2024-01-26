import React, { useEffect, useState } from 'react'
import { connectWallet } from '../../utils/connectWallet'
import Web3Context from '../../context/Web3Context'

const Wallet = ({children}) => {

    useEffect(() => {
        const handleWallet = async() => {
            try{
                const {provider,selectedAccount,stakingContract,withdrawContract,ethxContract,chainId} = await connectWallet();
                setConnected(true);
                setState({provider,selectedAccount,stakingContract,withdrawContract,ethxContract,chainId})
            }catch(error){
                console.error(error.message)
            }
        }
        handleWallet()
    }, [])

    const [state,setState] = useState({
        provider:null,
        account:null,
        stakingContract:null,
        withdrawContract:null,
        ethxContract:null,
        chainId:null
    })

    const [loading, setLoading] = useState(false);
    const [connected, setConnected] = useState(false);

    const handleWallet = async() => {
        try{
            setLoading(true)
            const {provider,selectedAccount,stakingContract,withdrawContract,ethxContract,chainId} = await connectWallet();
            setConnected(true);
            setState({provider,selectedAccount,stakingContract,withdrawContract,ethxContract,chainId})
        }catch(error){
            console.error(error.message)
        }
    }

  return (
    <div>
        <Web3Context.Provider value={state}>{children}</Web3Context.Provider>
        {
            !connected ? <button onClick={handleWallet} type="button" className="fixed top-10 right-6 text-[white] bg-[#93278F] rounded-lg hover:text-black px-5 py-2 me-2 mb-2">
                Connect with MetaMask
            </button> : 
            <button onClick={handleWallet} type="button" className="fixed top-10 right-6 text-[white] bg-[#93278F] px-5 py-2 rounded-lg hover:text-black me-2 mb-2">
                {state.selectedAccount.slice(0,6)}...{state.selectedAccount.slice(-4)}
            </button>
        }
    </div>
    
  )
}

export default Wallet