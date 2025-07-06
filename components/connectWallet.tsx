import React, { useState, useEffect } from 'react';

const mockStellarWallets = {
  connect: async (walletType: 'Freighter' | 'Albedo'): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (walletType === 'Freighter') {
          resolve('GABCD1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF');
        } else if (walletType === 'Albedo') {
          resolve('GHIJK1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF');
        } else {
          reject(new Error('Unsupported wallet type for mock.'));
        }
      }, 1000); 
    });
  },
};



const truncatePublicKey = (publicKey: string | null): string => {
  if (!publicKey) return '';
  return `${publicKey.substring(0, 4)}...${publicKey.substring(publicKey.length - 4)}`;
};

const ConnectWallet: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedPublicKey = localStorage.getItem('linkedStellarPublicKey');
    if (storedPublicKey) {
      setPublicKey(storedPublicKey);
      setIsConnected(true);
      setMessage('Wallet already linked!');
    }
  }, []);

  const handleConnect = async (walletType: 'Freighter' | 'Albedo') => {
    setLoading(true);
    setMessage('');
    setIsWalletModalOpen(false); // Close modal after selection

    try {
      const userPublicKey = await mockStellarWallets.connect(walletType);
      console.log(`Connected with ${walletType} wallet. Public Key: ${userPublicKey}`);
      const response = await fetch('/api/wallet/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicKey: userPublicKey }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsConnected(true);
        setPublicKey(userPublicKey);
        setMessage(data.message || 'Wallet connected successfully!');
        localStorage.setItem('linkedStellarPublicKey', userPublicKey); 
      } else {  
        setIsConnected(false);
        setPublicKey(null);
        setMessage(data.message || 'Failed to connect wallet.');
      }
    } catch (error: any) {
      setIsConnected(false);
      setPublicKey(null);
      setMessage(error.message || 'An unexpected error occurred during connection.');
      console.error('Wallet connection error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-inter">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Stellar Wallet Connection
        </h2>

        {isConnected && publicKey ? (
          <div className="flex flex-col items-center space-y-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Wallet Connected
            </span>
            <p className="text-gray-700 text-lg font-mono break-all">
              Public Key: <span className="font-semibold">{truncatePublicKey(publicKey)}</span>
            </p>
            {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
            <button
              onClick={() => {
                setIsConnected(false);
                setPublicKey(null);
                setMessage('');
                localStorage.removeItem('linkedStellarPublicKey'); // Clear simulated persistence
              }}
              className="mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setIsWalletModalOpen(true)}
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Connecting...' : 'Connect Stellar Wallet'}
            </button>

            {message && (
              <p className={`mt-4 text-center text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}

            {isWalletModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    Choose Your Wallet
                  </h3>
                  <div className="space-y-4">
                    <button
                      onClick={() => handleConnect('Freighter')}
                      className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                    >
                      <img src="https://placehold.co/24x24/cccccc/white?text=F" alt="Freighter Logo" className="mr-2" />
                      Connect with Freighter
                    </button>
                    <button
                      onClick={() => handleConnect('Albedo')}
                      className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                    >
                      <img src="https://placehold.co/24x24/cccccc/white?text=A" alt="Albedo Logo" className="mr-2" />
                      Connect with Albedo
                    </button>
                  </div>
                  <button
                    onClick={() => setIsWalletModalOpen(false)}
                    className="mt-6 w-full px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectWallet;
