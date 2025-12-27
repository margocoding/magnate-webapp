import bridge from "@vkontakte/vk-bridge";
import axios from "axios";
import { detectPlatform } from "../utils/detectPlatform";

const platform = detectPlatform();

bridge.send("VKWebAppInit");

const initAuthOnce = async () => {
  if (platform === "vk") {
    const launchParams = await bridge.send("VKWebAppGetLaunchParams");

    localStorage.setItem("vk-data", JSON.stringify(launchParams));
  } else if (platform === "telegram") {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      localStorage.setItem("telegram-init-data", tg.initData);
    }
  }
};

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
});

baseApi.interceptors.request.use(async (config) => {
  await initAuthOnce();
  if (
    config.method === "post" ||
    config.method === "put" ||
    config.method === "patch"
  ) {
    config.data = {
      ...(config.data ?? {}),
      vk_data: JSON.parse(localStorage.getItem("vk-data") || ""),
      telegram_token: localStorage.getItem("telegram-init-data") || null,
    };
  }

  return config;
});
