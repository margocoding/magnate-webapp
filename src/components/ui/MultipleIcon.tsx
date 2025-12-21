import type React from "react";

interface IProps {
  first: React.ReactNode;
  second: React.ReactNode;
}

const MultipleIcon: React.FC<IProps> = ({ first, second }) => {
  return (
    <div className="relative w-full h-full">
      <span className="absolute top-0 w-full left-0">{first}</span>
      <span className="absolute w-full top-0 left-0">{second}</span>
    </div>
  );
};

export default MultipleIcon;
