import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AnimationBase } from "./animations/canvas-animation";
import { useCallback, useEffect, useState } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Constructor<T> = new (...args: unknown[]) => T;

export function useAnimation<T extends AnimationBase>(cls: Constructor<T>) {
  const [animation, setAnimation] = useState<AnimationBase>();

  useEffect(() => {
    animation?.start();
    return () => animation?.stop();
  }, [animation]);

  return useCallback((node: HTMLCanvasElement) => {
    if (node) setAnimation(new cls(node));
  }, []);
}

export function slowScrollTo(e: HTMLElement) {
  const targetPosition = e.getBoundingClientRect().top;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 5000;
  let startTime = null;
  let scrollBreak = false;

  const stopAnimation = () => {
    scrollBreak = true;
    console.log("SCROLL BREAK");
  };

  window.addEventListener("wheel", stopAnimation);
  window.addEventListener("touchmove", stopAnimation);

  const easeInOutQuad = (t: number) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  const animation = (time: number) => {
    if (scrollBreak) {
      window.removeEventListener("wheel", stopAnimation);
      window.removeEventListener("touchmove", stopAnimation);
      return;
    }

    startTime ??= time;
    const timeElapsed = time - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

    if (timeElapsed < duration) {
      window.requestAnimationFrame(animation);
    } else {
      window.removeEventListener("wheel", stopAnimation);
      window.removeEventListener("touchmove", stopAnimation);
    }
  };

  window.requestAnimationFrame(animation);
}
