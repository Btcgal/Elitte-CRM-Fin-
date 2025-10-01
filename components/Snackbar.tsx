import React, { useEffect, useState } from 'react';

interface SnackbarProps {
  message: string;
  type: 'success' | 'error';
  onDismiss: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type, onDismiss }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300); // Wait for fade out
    }, 2700);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);
  
  const bgColor = type === 'success' ? 'bg-[#2ECC71]' : 'bg-[#E74C3C]';
  const icon = type === 'success' ? 'check_circle' : 'error';

  return (
    <div
      className={`fixed bottom-5 md:bottom-8 right-5 md:right-8 flex items-center px-4 py-3 rounded-lg text-white shadow-lg transition-transform duration-300 transform ${bgColor} ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <span className="material-symbols-outlined mr-3">{icon}</span>
      <p className="font-medium text-sm">{message}</p>
      <button onClick={onDismiss} className="ml-4 p-1 rounded-full hover:bg-white/20">
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  );
};

export default Snackbar;
