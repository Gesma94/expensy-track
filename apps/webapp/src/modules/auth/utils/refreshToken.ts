import { kyInstance } from '@modules/fetch/utils/kyInstance';
import type { ResponsePromise } from 'ky';

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

function getRefreshToken(): ResponsePromise {
  return kyInstance.get('refresh-token');
}

export function refreshToken(): Promise<boolean> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = getRefreshToken()
    .then(response => {
      if (response.ok) {
        return true;
      }

      return false;
    })
    .catch(_ => {
      return false;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
}
