import React from 'react';
import { WifiOff } from 'lucide-react';
import { useCrypto } from '../context/CryptoContext';

const OfflineBanner = () => {
  const { isOnline } = useCrypto();

  if (isOnline) return null;

  return (
    <div className="bg-red-500 text-white px-4 py-2 text-center flex items-center justify-center gap-2 font-medium sticky top-0 z-50">
      <WifiOff size={18} />
      <span>Check your connection. You're currently offline.</span>
    </div>
  );
};

export default OfflineBanner;
