'use client';
import { useEffect, useCallback, useRef, useMemo } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?';

const getInitialScramble = (text: string) => {
  return text
    .split('')
    .map((char, i) => {
      const pseudoRandomIndex = (char.charCodeAt(0) + i * 7) % CHARACTERS.length;
      return CHARACTERS[pseudoRandomIndex];
    })
    .join('');
};

export const ScrambleText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  const initialText = useMemo(() => getInitialScramble(text), [text]);

  const startScramble = useCallback(() => {
    let frame = 0;
    const step = 3;
    const revealOffset = 10;

    const interval = setInterval(() => {
      const scrambled = text
        .split('')
        .map((char, i) => {
          if (frame > i * step + revealOffset) return char;
          return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        })
        .join('');

      if (spanRef.current) {
        spanRef.current.innerText = scrambled;
      }

      if (frame > text.length * step + revealOffset) {
        clearInterval(interval);
      }
      frame++;
    }, 60);

    return interval;
  }, [text]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const timeoutId = setTimeout(() => {
      intervalId = startScramble();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [delay, startScramble]);

  return <span ref={spanRef}>{initialText}</span>;
};
