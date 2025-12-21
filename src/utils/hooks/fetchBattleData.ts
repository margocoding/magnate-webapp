import React from "react";
import type { Battle } from "../../types/battle.types";
import { fetchBattleship } from "../../api/gameApi";

export const useFetchBattleData = (id?: string) => {
  const [battleData, setBattleData] = React.useState<Battle | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [step, setStep] = React.useState<number>(1);

  React.useEffect(() => {
    const fetchBattleData = async () => {
      if (!id) return;

      setLoading(true);
      const data = await fetchBattleship(id);
      setLoading(false);

      setBattleData(data);
      setStep(data.step);
    };

    fetchBattleData();
  }, []);

  return {
    battleData,
    loading,
    step,
    moveNextStep: () => setStep((prev) => (prev < 3 ? prev + 1 : prev)),
  };
};
