import React from "react";
import type { Battle } from "../../types/battle.types";
import { fetchBattleship } from "../../api/gameApi";

export const useFetchBattleData = (id?: string) => {
  const [battleData, setBattleData] = React.useState<Battle | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [step, setStep] = React.useState<number>(1);

  const moveNextStepCalled = React.useRef(false);

  const remaining = React.useMemo(() => {
    if (!battleData?.createdAt || !battleData?.duration) return null;

    return (
      Date.now() -
      new Date(battleData.createdAt).getTime() -
      battleData.duration
    );
  }, [battleData?.createdAt, battleData?.duration]);

  React.useEffect(() => {
    const fetchBattleData = async () => {
      setLoading(true);
      const data = await fetchBattleship(id);
      setLoading(false);

      setBattleData(data);
      setStep(data.step);
    };

    fetchBattleData();
  }, [id]);

  React.useEffect(() => {
    if (remaining !== null && remaining < 0 && !moveNextStepCalled.current) {
      moveNextStepCalled.current = true;

      moveNextStep();
    }
  }, [remaining, moveNextStepCalled]);

  const moveNextStep = () => {
    setStep((prev) => (prev < 3 ? prev + 1 : prev));
  };

  return {
    battleData,
    loading,
    step,
    moveNextStep,
    remaining,
  };
};
