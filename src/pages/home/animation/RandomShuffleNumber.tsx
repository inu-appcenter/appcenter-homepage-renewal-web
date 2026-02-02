'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

const DURATION = 1000;

export const RandomShuffleNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let frameId: number;

    const digitCount = value.toString().length;
    const min = Math.pow(10, digitCount - 1);
    const max = Math.pow(10, digitCount) - 1;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < DURATION) {
        const randomVal = Math.floor(Math.random() * (max - min + 1)) + min;
        setDisplayValue(randomVal);
        frameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
};
