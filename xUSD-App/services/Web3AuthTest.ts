import { initWeb3Auth, isWeb3AuthConnected } from './web3AuthService'

export const testWeb3AuthInitialization = async (): Promise<void> => {
  try {
    console.log('Testing Web3Auth initialization...');
    await initWeb3Auth();
    
    if (isWeb3AuthConnected()) {
      console.log('✅ Web3Auth is connected');
    } else {
      console.log('ℹ️ Web3Auth is not connected (expected before authentication)');
    }
    
    console.log('✅ Web3Auth initialization test passed');
  } catch (error) {
    console.error('❌ Web3Auth initialization test failed:', error);
    throw error;
  }
};