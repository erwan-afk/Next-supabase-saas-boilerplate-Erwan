import React from "react";

interface SpinnerProps {
  text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 h-full">
      {/* Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-[30px] h-[30px] border-4 border-t-4 border-blur border-t-goldyellow rounded-full animate-spin"></div>
        <div className="absolute w-[30px] h-[30px] border-4 border-t-4 border-blur border-t-goldyellow rounded-full animate-spin"></div>
      </div>

      {/* Custom Text */}
      <p className="text-gray-500 text-sm font-medium">{text}</p>
    </div>
  );
};

export default Spinner;
