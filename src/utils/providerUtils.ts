// @ts-nocheck
import { createPublicClient, createWalletClient, http, parseEther, parseUnits, formatEther, formatUnits } from 'viem';
import { getAccount, getWalletClient, getPublicClient } from '@wagmi/core';

/**
 * Ultra simplified utility functions for handling providers with Viem
 * Using @ts-nocheck to avoid TypeScript issues
 */

/**
 * Create a viem wallet client from provider
 */
export async function createViemWalletClient() {
  try {
    const walletClient = await getWalletClient();
    return walletClient;
  } catch (error) {
    console.error('Error creating viem wallet client:', error);
    throw error;
  }
}

/**
 * Create a viem public client
 */
export function createViemPublicClient() {
  try {
    const publicClient = getPublicClient();
    return publicClient;
  } catch (error) {
    console.error('Error creating viem public client:', error);
    throw error;
  }
}

/**
 * Switch network (using window.ethereum directly)
 */
export async function switchToNetwork(chainId: string, networkConfig?: any) {
  if (!window.ethereum) {
    throw new Error('No Web3 Provider found');
  }

  console.log('Attempting to switch to network:', networkConfig?.name, 'chainId:', chainId);

  try {
    // Try to switch to the network
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainId }],
    });

    console.log('Successfully switched network');
    return true;

  } catch (switchError: any) {
    console.log('Switch error:', switchError);

    // This error code means the chain has not been added to MetaMask
    if (switchError.code === 4902 && networkConfig) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: networkConfig.chainId,
            chainName: networkConfig.name,
            nativeCurrency: {
              name: networkConfig.symbol,
              symbol: networkConfig.symbol,
              decimals: 18
            },
            rpcUrls: [networkConfig.rpcUrl],
            blockExplorerUrls: [networkConfig.blockExplorer]
          }]
        });
        console.log('Network added and switched successfully');
        return true;
      } catch (addError) {
        console.error('Failed to add network:', addError);
        throw new Error('Failed to add network');
      }
    }
    console.error('Failed to switch network:', switchError);
    throw switchError;
  }
}

/**
 * Get wallet balance
 */
export async function getWalletBalance(provider: any, address: string) {
  try {
    const publicClient = createViemPublicClient();
    const balance = await publicClient.getBalance({ 
      address: address as `0x${string}` 
    });
    return formatEther(balance);
  } catch (error) {
    console.error('Error getting balance:', error);
    return '0';
  }
}

/**
 * Get token balance
 */
export async function getTokenBalance(provider: any, tokenAddress: string, walletAddress: string, decimals: number = 18) {
  try {
    const publicClient = createViemPublicClient();
    const balance = await publicClient.readContract({
      address: tokenAddress as `0x${string}`,
      abi: [{
        name: 'balanceOf',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ name: '', type: 'uint256' }]
      }],
      functionName: 'balanceOf',
      args: [walletAddress as `0x${string}`]
    });
    return formatUnits(balance as bigint, decimals);
  } catch (error) {
    console.error('Error getting token balance:', error);
    return '0';
  }
}

/**
 * Send native transaction
 */
export async function sendNativeTransaction(provider: any, to: string, amount: string) {
  try {
    const walletClient = await createViemWalletClient();
    const account = getAccount();
    
    if (!account.address) {
      throw new Error('No wallet connected');
    }

    const hash = await walletClient.sendTransaction({
      account: account.address,
      to: to as `0x${string}`,
      value: parseEther(amount)
    });
    
    return hash;
  } catch (error) {
    console.error('Error sending native transaction:', error);
    throw error;
  }
}

/**
 * Send token transaction
 */
export async function sendTokenTransaction(provider: any, tokenAddress: string, to: string, amount: string, decimals: number = 18) {
  try {
    const walletClient = await createViemWalletClient();
    const publicClient = createViemPublicClient();
    const account = getAccount();
    
    if (!account.address) {
      throw new Error('No wallet connected');
    }

    const transferAmount = parseUnits(amount, decimals);
    
    // Check balance
    const balance = await publicClient.readContract({
      address: tokenAddress as `0x${string}`,
      abi: [{
        name: 'balanceOf',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ name: '', type: 'uint256' }]
      }],
      functionName: 'balanceOf',
      args: [account.address]
    });
    
    if ((balance as bigint) < transferAmount) {
      throw new Error('Insufficient balance');
    }
    
    const hash = await walletClient.writeContract({
      account: account.address,
      address: tokenAddress as `0x${string}`,
      abi: [{
        name: 'transfer',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          { name: 'to', type: 'address' },
          { name: 'amount', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'bool' }]
      }],
      functionName: 'transfer',
      args: [to as `0x${string}`, transferAmount]
    });
    
    return hash;
  } catch (error) {
    console.error('Error sending token transaction:', error);
    throw error;
  }
}

/**
 * Analyze provider
 */
export function analyzeProvider(provider: any) {
  const account = getAccount();
  return { 
    isValid: !!account.address, 
    canSign: !!account.address && !!account.connector 
  };
}

/**
 * Get error message
 */
export function getProviderErrorMessage(error: any) {
  if (error.code === 4001) return 'Transaction cancelled by user';
  if (error.code === -32603) return 'Insufficient balance or network error';
  if (error.code === 4902) return 'Network not found in wallet';
  if (error.reason) return `Error: ${error.reason}`;
  if (error.message) {
    if (error.message.includes('insufficient funds')) return 'Insufficient balance';
    if (error.message.includes('user rejected')) return 'Transaction rejected';
    return error.message;
  }
  return 'Unknown transaction error';
}

// Legacy compatibility exports (using viem under the hood)
export const createEthersProvider = () => {
  console.warn('createEthersProvider is deprecated, using viem instead');
  return { getSigner: () => ({ getAddress: () => getAccount().address }) };
};

export const getNetworkSwitchProvider = () => {
  return typeof window !== 'undefined' ? (window as any).ethereum : null;
};