import { useState } from "react";
import { BrowserProvider } from "ethers";

export default function useWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      alert("Please install MetaMask");
      return;
    }
    const web3Provider = new BrowserProvider((window as any).ethereum);
    const accounts = await web3Provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
    setProvider(web3Provider);
  };

  return { account, provider, connectWallet };
}