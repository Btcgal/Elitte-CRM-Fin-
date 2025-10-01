import React from 'react';

interface ChipProps {
  label: string;
  colorClasses?: string;
  icon?: string;
}

const Chip: React.FC<ChipProps> = ({ label, colorClasses = 'bg-gray-100 text-gray-800', icon }) => {
  return (
    <div className={`px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center ${colorClasses}`}>
      {icon && <span className="material-symbols-outlined text-sm mr-1.5">{icon}</span>}
      {label}
    </div>
  );
};

export default Chip;
