import { useHref } from 'react-router-dom';

export function useAbsoluteHref(path: string): string {
  const relative = useHref(path);
  if (path.startsWith('https://') || path.startsWith('http://') || path.startsWith('mailto:')) {
    return path;
  }
  return relative;
}
