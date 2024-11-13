import React from 'react';

type Step = {
  label: string;
  icon: React.ReactNode;
  timestamp?: string;
  isCompleted: boolean;
};

type ProgressBarIconProps = {
  steps: Step[];
};

const ProgressBarIcon: React.FC<ProgressBarIconProps> = ({ steps }) => {
  return (
    <div className="flex justify-center w-full">
      {steps.map((step, index) => (
        <div 
          key={index} 
          className={`flex flex-1 flex-col items-center ${
            index === 0 ? 'items-start' : index === steps.length - 1 ? 'items-end' : 'items-center'
          }`}
        >
          {/* Circle Icon with SVG */}
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full border-4 ${
              step.isCompleted ? 'border-green-500 text-green-500' : 'border-gray-300 text-gray-300'
            }`}
          >
            {step.icon}
          </div>

          {/* Label */}
          <div className="mt-4 flex flex-col items-center px-1">
            <div className="text-gray-800 font-semibold text-center">{step.label}</div>
            {step.timestamp && <div className="text-sm text-gray-400">{step.timestamp}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBarIcon;