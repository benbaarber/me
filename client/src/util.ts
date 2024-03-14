import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ThreeAnimation from "./animations/canvas-animation";
import { useCallback, useEffect, useState } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Constructor<T> = new (...args: unknown[]) => T;

export function useThreeAnimation<T extends ThreeAnimation>(ta: Constructor<T>) {
  const [animation, setAnimation] = useState<ThreeAnimation>();

  useEffect(() => {
    animation?.animate();
    return () => animation?.stop();
  }, [animation])
  
  return useCallback((node: HTMLCanvasElement) => {
    if (node) setAnimation(new ta(node))
  }, []);
}
