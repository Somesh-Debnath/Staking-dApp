import React from 'react'
import {Contract, ethers} from "ethers"
import stakingAbi from "../ABI/stakingAbi.json"
import withdrawAbi from "../ABI/withdrawAbi.json"
import ethxAbi from "../ABI/ethxAbi.json"

const switchToGoerli = async () => {
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
                chainId: "0x5" // Goerli Testnet chain ID
            }]
        });
        console.log("Switched to Goerli Testnet");
    } catch (error) {
        console.error(error.message);
        if(error.code === 4902){
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{
                    chainId: "0x5",
                    chainName: "Goerli Testnet",
                    nativeCurrency: {
                        name: "Ether",
                        symbol: "ETH",
                        decimals: 18
                    },
                    rpcUrls: ["https://ethereum-goerli.publicnode.com"],
                    blockExplorerUrls: ["https://goerli.etherscan.io/"]
                }]
            });
            console.log("Added Goerli Testnet");
        }
    }
}


export const connectWallet = async () => {
    try{

        let [signer , provider , stakingContract , withdrawContract, ethxContract , chainId] = [null]
        
        if(window.ethereum === null){
            throw new Error("Metamask not installed")
        }

        const accounts = await window.ethereum.request({
            method:"eth_requestAccounts"
        })

        let chainIdHex = await window.ethereum.request({
            method:"eth_chainId"
        })

        chainId = parseInt(chainIdHex,16)
        if(chainId !== 5){
           // switch to goerli testnet if connected to another one
            await switchToGoerli()
        }
            var selectedAccount  = accounts[0]
            if(!selectedAccount){
                throw new Error("no ethereum accounts available")
            }

            provider = new ethers.BrowserProvider(window.ethereum)
            signer = await provider.getSigner();

            const stakingContractAddress = "0xd0e400Ec6Ed9C803A9D9D3a602494393E806F823"
            const withdrawContractAddress = "0x1048Eca024cB2Ba5eA720Ac057D804E95a809Fc8"
            const ethxContractAddress = "0x3338eCd3ab3d3503c55c931d759fA6d78d287236";
            
            stakingContract = new Contract(stakingContractAddress , stakingAbi , signer)
            withdrawContract = new Contract(withdrawContractAddress , withdrawAbi ,signer)
            ethxContract = new Contract(ethxContractAddress,ethxAbi,signer)
        return {provider , selectedAccount , withdrawContract , stakingContract ,ethxContract, chainId}
    }catch(error){
        console.error(error.message)
    }
}