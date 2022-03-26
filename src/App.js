import "./App.css";
import mintAbi from "./mintAbi.json";
import { ethers, BigNumber } from "ethers";

import { useEffect, useState } from "react";

const mintAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  // connect
  const [accounts, setAccounts] = useState([]);

  async function connectAccounts() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  useEffect(() => {
    connectAccounts();
  }, []);

  // MINTING
  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const { abi } = mintAbi;
      const contract = new ethers.Contract({
        mintAddress,
        abi,
        signer,
      });

      try {
        const response = await contract.mint(BigNumber.from(mintAmount));
        console.log("success", response);
      } catch (err) {
        console.log("error", err);
      }
    }
  }

  const [mintAmount, setMintAmount] = useState(1);

  return (
    <div className="App">
      mint button
      {accounts.length && (
        <div>
          <button onClick={() => setMintAmount(mintAmount - 1)}>-</button>

          {mintAmount}

          <button onClick={() => setMintAmount(mintAmount + 1)}>+</button>
          <button onClick={handleMint}>Mint</button>
        </div>
      )}
    </div>
  );
}

export default App;
