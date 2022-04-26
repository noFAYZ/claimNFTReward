import { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/api.json';
import { ethers } from 'ethers';
import Form from './Form';


const contractAddress = "0xD7aE835f3D514aa12DceCDED556ff050E142adC6";
const abi = contract;



function App() {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [ownNFTs, setownNFTs] = useState(false);
  const [CheckOwnNFTs, setCheckOwnNFTs] = useState(true);


  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
      ownNftHandler();
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }

    

  }

  const ownNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
          
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        console.log(currentAccount);
        let nftTxn = await nftContract.balanceOf(currentAccount);

        console.log("🔎 Investigating... please wait");
        console.log(nftTxn.toNumber())

          if(nftTxn.toNumber() > 0){
              setownNFTs(true);
              setCheckOwnNFTs(true)
          } 
          else{
              setownNFTs(false);
              setCheckOwnNFTs(false)
          } 

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }



  const ownNftButton = () => {


  if(ownNFTs){
              return(
                
               <Form />
                    
          )}

  else{
    console.log(CheckOwnNFTs)
      return (
        <div>
           {CheckOwnNFTs ? " ": notOwner()}
       
      <button onClick={ownNftHandler} className='cta-button mint-nft-button'>
          Are you a Hodler? 🤨 
        </button>
         </div>
      )}
    
  }


  const notOwner = () => {
    return (
      <div > <h2 style={{"background-color":"red", "border-radius":"20px","padding":"10px 0", "color":"white","width":"25%","display": "inline-block" }}>Psst You don't own any our NFTs </h2>

      </div>
    )
  }
  

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div className='main-app'>
    
      <div>

        {currentAccount ? ownNftButton() : connectWalletButton()}
   
      </div>
    </div>
  )
}

export default App;
