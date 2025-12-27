import { baseApi } from "./api";
import type { SuccessResponse } from "./gameApi";

export interface Profile {
  id: number;
  fullName: string;
  avatar: string | null;
  cash: number;
  euro: number;
  reputation: number;
  btc: number;
  company: string;
  createdAt: string;
}

export const fetchProfile = async (): Promise<Profile> => {
  try {
    const { data } = await baseApi.post("/profile/get");

    return data;
  } catch (e) {
    console.error(e);
    throw new Error("Ошибка при получении профиля");
  }
};

export const checkAuth = async (): Promise<SuccessResponse> => {
  try {
    const { data } = await baseApi.post("/auth/check/token");

    return data;
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};
