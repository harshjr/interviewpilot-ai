"use client";

import { useEffect, useCallback } from "react";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function useKonamiCode(onSuccess: () => void) {
  const sequence: string[] = [];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      sequence.push(e.key);
      if (sequence.length > KONAMI_CODE.length) {
        sequence.shift();
      }
      if (
        sequence.length === KONAMI_CODE.length &&
        sequence.every((key, i) => key === KONAMI_CODE[i])
      ) {
        onSuccess();
      }
    },
    [onSuccess]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
