import type { Battle } from "../types/battle.types";
import { baseApi } from "./api";

export interface SuccessResponse {
  success: boolean;
}

export const fetchBattleship = async (id: string = ""): Promise<Battle> => {
  const { data } = await baseApi.post(`/game/battleship/get/${id}`);

  return data;
};

export const appleTargetLocation = async (
  x: number,
  y: number
): Promise<SuccessResponse> => {
  const { data } = await baseApi.post(`/game/battleship/target/${x}/${y}`);

  return data;
};
