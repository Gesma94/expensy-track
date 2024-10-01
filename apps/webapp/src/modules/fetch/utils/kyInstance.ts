import ky from 'ky';

export const kyInstance = ky.create({
  credentials: 'include',
  prefixUrl: `${import.meta.env.VITE_BFF_ADDRESS}/api`
});
