import React, { useEffect, useRef } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';

interface WalletModalHelperProps {
  onModalRequest?: () => void;
}

// Helper component to manage Web3Modal access
const WalletModalHelper: React.FC<WalletModalHelperProps> = ({ onModalRequest }) => {
  const { open } = useWeb3Modal();
  const openRef = useRef(open);
  
  // Update ref when open function changes
  useEffect(() => {
    openRef.current = open;
  }, [open]);
  
  // Listen for custom events to open modal
  useEffect(() => {
    const handleOpenModal = () => {
      try {
        openRef.current();
        if (onModalRequest) {
          onModalRequest();
        }
      } catch (error) {
        console.error('Error opening Web3Modal:', error);
      }
    };
    
    // Custom event listener
    window.addEventListener('open-wallet-modal', handleOpenModal);
    
    // Make open function globally available
    (window as any).openWalletModal = handleOpenModal;
    
    return () => {
      window.removeEventListener('open-wallet-modal', handleOpenModal);
      delete (window as any).openWalletModal;
    };
  }, [onModalRequest]);
  
  return null; // This component doesn't render anything
};

export default WalletModalHelper;