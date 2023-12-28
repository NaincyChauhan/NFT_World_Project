import React, { useState } from 'react';
import { ethers } from 'ethers';

const UserRegistration = () => {
  const [walletAddress, setWalletAddress] = useState('');

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request access to MetaMask accounts
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      console.error('MetaMask not found. Please install MetaMask.');
    }
  };

  const handleRegister = async () => {
    // Call your Laravel API endpoint for user registration
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet_address: walletAddress }),
      });

      const data = await response.json();
      console.log('User registration successful:', data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      <button onClick={handleConnectWallet}>Connect Wallet</button>
      <button onClick={handleRegister} disabled={!walletAddress}>
        Register
      </button>
    </div>
  );
};

export default UserRegistration;
