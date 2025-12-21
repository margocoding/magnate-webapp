import { Spinner } from "@heroui/react";
import type React from "react";

const Loading: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Spinner
        size="lg"
        variant="gradient"
        color="secondary"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default Loading;
