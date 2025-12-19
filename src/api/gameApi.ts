import { baseApi } from "./api";

export interface Location {
  playerId: number;
  x: number;
  y: number;
}

export interface Company {
  title: string;
  locations: Location[];
  aims: Location[];
}

export interface Battle {
  id: number;
  createdAt: string;
  step: number;
  status: "DRAW" | "LOSE" | "WIN";
  duration: number;
  targetCompany: Company;
  company: Company;
}

export interface SuccessResponse {
  success: boolean;
}

export const fetchBattleship = async (id: string): Promise<Battle> => {
  const { data } = await baseApi.get(`/game/battleship/get/${id}`);

  return data;
};

export const appleTargetLocation = async (
  x: number,
  y: number
): Promise<SuccessResponse> => {
  const { data } = await baseApi.get(`/game/battleship/target/${x}/${y}`);

  return data;
};
