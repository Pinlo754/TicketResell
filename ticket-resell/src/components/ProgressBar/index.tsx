import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  steps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-center w-full my-8">
      {[...Array(steps)].map((_, index) => (
        <div key={index} className="flex items-center flex-1">
          {/* Step Circle */}
          <div
            className={`w-10 h-10 rounded-full flex justify-center items-center text-white z-10 ${
              index + 1 <= currentStep ? 'bg-[#87CBB9]' : 'bg-[#B9EDDD]'
            }`}
          >
            {index + 1}
          </div>

          {/* Line Between Steps (except for the last step) */}
          {index + 1 !== steps && (
            <div className="flex-1 h-1 mx-2">
              <div
                className={`h-full ${
                  index + 1 < currentStep ? 'bg-[#87CBB9]' : 'bg-[#B9EDDD]'
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;