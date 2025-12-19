import { Chip } from "@heroui/react";
import React from "react";
import { formatTime } from "../../utils/formatTime";

interface IProps {
  createdAt: string;
  duration: number;
}

const RemainingTime: React.FC<IProps> = ({ duration, createdAt }) => {
  const createdAtMs = React.useMemo(
    () => new Date(createdAt).getTime(),
    [createdAt]
  );

  const endTime = createdAtMs + duration;
  const [remaining, setRemaining] = React.useState(endTime - Date.now());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(endTime - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div>
      <Chip color="danger">Оставшееся время: {formatTime(remaining)}</Chip>
    </div>
  );
};

export default RemainingTime;
