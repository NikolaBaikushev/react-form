import { useRef, useCallback } from "react";

export const useDebouncer = (ms: number, fn: (...params: any[]) => void) => {
  const timer = useRef<number>(null);

  const debouncedFn = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      fn();
    }, ms);
  }, [fn, ms])

  return debouncedFn;
}