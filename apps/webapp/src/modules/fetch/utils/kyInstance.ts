import ky from "ky";

export const kyInstance = ky.create({
  prefixUrl: `${import.meta.env.VITE_BFF_ADDRESS}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
