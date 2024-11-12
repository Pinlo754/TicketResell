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
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          {/* Circle Icon with SVG */}
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full border-4 ${
              step.isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-green-500 text-green-500 bg-white'
            }`}
          >
            {step.icon}
          </div>
          
          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div className="flex-grow w-full h-1 bg-green-500" style={{ marginTop: '-1.5rem' }}></div>
          )}
          
          {/* Label */}
          <div className="mt-6 flex flex-col">
            <div className="text-gray-800 font-semibold self-start">{step.label}</div>
            {step.timestamp && <div className="text-sm text-center text-gray-400">{step.timestamp}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBarIcon;
