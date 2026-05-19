'use client';
import { useEffect, useRef } from 'react';
import { useInView } from 'motion/react';

const ANIMATION_DURATION = 1000;

export const RandomShuffleNumber = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const length = value.toString().length;
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;

    let startTime: number;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      if (timestamp - startTime < ANIMATION_DURATION) {
        const randomVal = Math.floor(Math.random() * (max - min + 1)) + min;
        ref.current!.textContent = String(randomVal);
        frameId = requestAnimationFrame(step);
      } else {
        ref.current!.textContent = String(value);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value]);

  return <span ref={ref}>0</span>;
};
